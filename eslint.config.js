import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: { 
      globals: {
        ...globals.node // ISSO AQUI habilita o 'process' e outras globais do Node
      } 
    }
  },
  pluginJs.configs.recommended,
];