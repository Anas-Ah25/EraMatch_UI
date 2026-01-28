import * as fs from 'fs';
import * as path from 'path';

interface ComponentAudit {
    file: string;
    status: 'API_FETCHING' | 'HARDCODED' | 'MIXED' | 'NO_DATA' | 'UI_ONLY';
    hasApiImport: boolean;
    hasUseEffect: boolean;
    hasHardcodedArrays: boolean;
    hasUseState: boolean;
    apiCalls: string[];
    hardcodedPatterns: string[];
    notes: string;
}

const componentsDir = 'c:\\Users\\Dell\\Desktop\\UI EraMatch\\EraMatch_UI\\src\\components';

function analyzeComponent(filePath: string): ComponentAudit {
    const content = fs.readFileSync(filePath, 'utf-8');
    const fileName = path.basename(filePath);

    // Check for API usage
    const hasApiImport = content.includes("from '../services/api'") || content.includes('from "../services/api"');
    const hasUseEffect = content.includes('useEffect');
    const hasUseState = content.includes('useState');

    // Find API calls
    const apiCallMatches = content.match(/api\.\w+\.\w+\(/g) || [];
    const apiCalls = [...new Set(apiCallMatches.map(call => call.replace('(', '')))];

    // Check for hardcoded data patterns
    const hardcodedPatterns: string[] = [];

    // More specific patterns to avoid false positives:
    // 1. Look for arrays with actual object literals containing data
    const hasHardcodedArrays =
        // Array initialization with objects that have multiple properties (not just empty [])
        /const \w+\s*[:=]\s*\[\s*\{[\s\S]{20,}?\}/.test(content) ||
        // useState initialized with array containing objects
        /useState<[^>]+>\(\[\s*\{[\s\S]{20,}?\}/.test(content);

    // Determine status
    let status: ComponentAudit['status'];
    let notes = '';

    if (hasApiImport && apiCalls.length > 0 && !hasHardcodedArrays) {
        status = 'API_FETCHING';
        notes = `Fetches data via ${apiCalls.join(', ')}`;
    } else if (hasApiImport && apiCalls.length > 0 && hasHardcodedArrays) {
        status = 'MIXED';
        notes = `Uses API (${apiCalls.join(', ')}) but also has hardcoded data`;
    } else if (hasHardcodedArrays) {
        status = 'HARDCODED';
        notes = 'Contains hardcoded data arrays';
    } else if (!hasUseState && !hasUseEffect) {
        status = 'UI_ONLY';
        notes = 'Pure UI component (no state/effects)';
    } else {
        status = 'NO_DATA';
        notes = 'Has state but no significant data patterns detected';
    }

    return {
        file: fileName,
        status,
        hasApiImport,
        hasUseEffect,
        hasHardcodedArrays,
        hasUseState,
        apiCalls,
        hardcodedPatterns: [],
        notes
    };
}

function getAllTsxFiles(dir: string): string[] {
    const files: string[] = [];

    function traverse(currentPath: string) {
        const entries = fs.readdirSync(currentPath, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(currentPath, entry.name);

            if (entry.isDirectory()) {
                traverse(fullPath);
            } else if (entry.name.endsWith('.tsx')) {
                files.push(fullPath);
            }
        }
    }

    traverse(dir);
    return files;
}

// Main execution
const allFiles = getAllTsxFiles(componentsDir);
const audits: ComponentAudit[] = [];

console.log(`Analyzing ${allFiles.length} TSX files...\n`);

for (const file of allFiles) {
    try {
        const audit = analyzeComponent(file);
        audits.push(audit);
    } catch (error) {
        console.error(`Error analyzing ${file}:`, error);
    }
}

// Generate report
const apiFetching = audits.filter(a => a.status === 'API_FETCHING');
const hardcoded = audits.filter(a => a.status === 'HARDCODED');
const mixed = audits.filter(a => a.status === 'MIXED');
const noData = audits.filter(a => a.status === 'NO_DATA');
const uiOnly = audits.filter(a => a.status === 'UI_ONLY');

console.log('='.repeat(80));
console.log('COMPONENT DATA FETCHING AUDIT REPORT');
console.log('='.repeat(80));
console.log();
console.log(`Total Components: ${audits.length}`);
console.log(`✅ API Fetching: ${apiFetching.length}`);
console.log(`❌ Hardcoded Data: ${hardcoded.length}`);
console.log(`⚠️  Mixed (API + Hardcoded): ${mixed.length}`);
console.log(`ℹ️  No Data: ${noData.length}`);
console.log(`🎨 UI Only: ${uiOnly.length}`);
console.log();

// Detailed breakdown
console.log('='.repeat(80));
console.log('✅ COMPONENTS USING API FETCHING');
console.log('='.repeat(80));
apiFetching.forEach(a => {
    console.log(`\n📄 ${a.file}`);
    console.log(`   API Calls: ${a.apiCalls.join(', ')}`);
    console.log(`   Notes: ${a.notes}`);
});

console.log('\n' + '='.repeat(80));
console.log('❌ COMPONENTS WITH HARDCODED DATA');
console.log('='.repeat(80));
hardcoded.forEach(a => {
    console.log(`\n📄 ${a.file}`);
    console.log(`   Notes: ${a.notes}`);
});

console.log('\n' + '='.repeat(80));
console.log('⚠️  COMPONENTS WITH MIXED APPROACH');
console.log('='.repeat(80));
mixed.forEach(a => {
    console.log(`\n📄 ${a.file}`);
    console.log(`   API Calls: ${a.apiCalls.join(', ')}`);
    console.log(`   Notes: ${a.notes}`);
});

// Export to JSON
const reportPath = path.join(componentsDir, '..', '..', 'component-audit-report.json');
fs.writeFileSync(reportPath, JSON.stringify({
    summary: {
        total: audits.length,
        apiFetching: apiFetching.length,
        hardcoded: hardcoded.length,
        mixed: mixed.length,
        noData: noData.length,
        uiOnly: uiOnly.length
    },
    components: audits
}, null, 2));

console.log(`\n\n📊 Full report exported to: ${reportPath}`);
