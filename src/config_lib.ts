import * as YAML from 'js-yaml';
import * as fs from 'fs';

const configFile = "config.yml"

export interface Config {
    logo_path: string;
    chain_name: string;

}

export default async function readConfigFile(): Promise<Config> {
    try {
        let cwd = process.cwd();
        let regexp: RegExp = /^(.*)\/src\/?$/;
        let match = regexp.exec(cwd)
        var cfgFile = match[1] + "/" + configFile;
        const fileContents = fs.readFileSync(cfgFile, 'utf8');
        const yamlConfig = YAML.load(fileContents) as Config;
        return new Promise((resolve) => resolve(yamlConfig));
      } catch (error) {
        console.error('Error reading or parsing YAML file:', error);
      }
}