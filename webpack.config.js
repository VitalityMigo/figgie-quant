const path = require('path');

module.exports = {
  entry: './popup.js', // Point d'entrée principal
  output: {
    filename: 'bundle.js', // Fichier de sortie
    path: path.resolve(__dirname, 'dist'), // Dossier de sortie
  },
  mode: 'production', // Mode production pour un fichier optimisé
  module: {
    rules: [
      {
        test: /\.js$/, // Appliquer cette règle à tous les fichiers .js
        exclude: /node_modules/, // Exclure le dossier node_modules
        use: {
          loader: 'babel-loader', // Utiliser Babel pour transpiler le code
          options: {
            presets: ['@babel/preset-env'], // Transpiler vers ES5
          },
        },
      },
    ],
  },
};
