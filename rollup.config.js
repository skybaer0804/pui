const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const { readFileSync } = require('fs');

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));

// 모든 컴포넌트와 메인 엔트리 포인트
const entries = {
    index: 'src/index.ts',
    'context/ThemeProvider': 'src/context/ThemeProvider/index.ts',
    'ui-component/Accordion': 'src/ui-component/Accordion/index.ts',
    'ui-component/Alert': 'src/ui-component/Alert/index.ts',
    'ui-component/Avatar': 'src/ui-component/Avatar/index.ts',
    'ui-component/Badge': 'src/ui-component/Badge/index.ts',
    'ui-component/BottomNavigation': 'src/ui-component/BottomNavigation/index.ts',
    'ui-component/Breadcrumbs': 'src/ui-component/Breadcrumbs/index.ts',
    'ui-component/Button': 'src/ui-component/Button/index.ts',
    'ui-component/ButtonGroup': 'src/ui-component/ButtonGroup/index.ts',
    'ui-component/Card': 'src/ui-component/Card/index.ts',
    'ui-component/Checkbox': 'src/ui-component/Checkbox/index.ts',
    'ui-component/CircularProgress': 'src/ui-component/CircularProgress/index.ts',
    'ui-component/Collapsible': 'src/ui-component/Collapsible/index.ts',
    'ui-component/Dialog': 'src/ui-component/Dialog/index.ts',
    'ui-component/Divider': 'src/ui-component/Divider/index.ts',
    'ui-component/Drawer': 'src/ui-component/Drawer/index.ts',
    'ui-component/FloatingActionButton': 'src/ui-component/FloatingActionButton/index.ts',
    'ui-component/Input': 'src/ui-component/Input/index.ts',
    'ui-component/Layout': 'src/ui-component/Layout/index.ts',
    'ui-component/List': 'src/ui-component/List/index.ts',
    'ui-component/Loading': 'src/ui-component/Loading/index.ts',
    'ui-component/Pagination': 'src/ui-component/Pagination/index.ts',
    'ui-component/Paper': 'src/ui-component/Paper/index.ts',
    'ui-component/Radio': 'src/ui-component/Radio/index.ts',
    'ui-component/RadioGroup': 'src/ui-component/RadioGroup/index.ts',
    'ui-component/Select': 'src/ui-component/Select/index.ts',
    'ui-component/Skeleton': 'src/ui-component/Skeleton/index.ts',
    'ui-component/SpeedDial': 'src/ui-component/SpeedDial/index.ts',
    'ui-component/StatusChip': 'src/ui-component/StatusChip/index.ts',
    'ui-component/Stepper': 'src/ui-component/Stepper/index.ts',
    'ui-component/Switch': 'src/ui-component/Switch/index.ts',
    'ui-component/Table': 'src/ui-component/Table/index.ts',
    'ui-component/Tabs': 'src/ui-component/Tabs/index.ts',
    'ui-component/TextField': 'src/ui-component/TextField/index.ts',
    'ui-component/Tooltip': 'src/ui-component/Tooltip/index.ts',
    'ui-component/Typography': 'src/ui-component/Typography/index.ts',
};

function createConfig(outputDir, format) {
    return Object.keys(entries).map((entryName) => {
        const input = entries[entryName];
        const outputFile = format === 'es' ? `${outputDir}/${entryName}/index.esm.js` : `${outputDir}/${entryName}/index.js`;

        return {
            input,
            output: {
                file: outputFile,
                format,
                exports: 'named',
                sourcemap: true,
            },
            external: [
                ...Object.keys(pkg.peerDependencies || {}),
                ...Object.keys(pkg.dependencies || {}),
                'preact',
                'preact/hooks',
                'preact/jsx-runtime',
                '@tabler/icons-react',
                /\.scss$/,
                /\.css$/,
            ],
            plugins: [
                resolve({
                    extensions: ['.ts', '.tsx', '.js', '.jsx'],
                }),
                commonjs(),
                typescript({
                    tsconfig: './tsconfig.json',
                    declaration: true,
                    declarationDir: outputDir,
                    rootDir: 'src',
                    exclude: ['**/*.test.ts', '**/*.test.tsx', '**/node_modules/**'],
                    allowImportingTsExtensions: false,
                }),
            ],
        };
    });
}

module.exports = [...createConfig('dist', 'cjs'), ...createConfig('dist', 'es')];
