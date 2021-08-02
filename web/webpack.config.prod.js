const path = require('path');

let sassImplementation;
try {
    // tslint:disable-next-line:no-implicit-dependencies
    sassImplementation = require('node-sass');
} catch {
    sassImplementation = require('sass');
}

module.exports = {
    // Fix for: https://github.com/recharts/recharts/issues/1463
    node: {
        fs: 'empty'
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            syntax: 'postcss-scss',
                            plugins: () => [
                                require('tailwindcss')(__dirname + "/src/tailwind/tailwind.config.js"),
                                require('autoprefixer'),
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: sassImplementation,
                            sourceMap: false,
                            sassOptions: {
                                precision: 8,
                                includePaths: [
                                    "src/styles/common"
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test: /styles\/tailwind\.scss$/,
                use: [
                    {
                        loader: '@fullhuman/purgecss-loader',
                        options: {
                            content: [
                                path.join(__dirname, 'src/**/*.html'),
                                path.join(__dirname, 'src/**/*.ts'),
                                // path.join(__dirname, 'src/**/*.scss')
                            ],
                            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            syntax: 'postcss-scss',
                            plugins: () => [
                                require('tailwindcss')(__dirname + "/src/tailwind/tailwind.config.js"),
                                require('autoprefixer'),
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: sassImplementation,
                            sourceMap: false,
                            sassOptions: {
                                precision: 8,
                                includePaths: [
                                    "src/styles/common"
                                ]
                            }
                        }
                    }
                ]
            }
        ]
    }
};
