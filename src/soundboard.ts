import { exec } from "child_process";
import { select } from "@inquirer/prompts";
import * as fs from "node:fs";

import * as path from "node:path";

let lastValue = "";

const clear = () => process.stdout.write("\x1Bc");

const run = async () => {
  const audioFilesDir = "/Users/chrisburgin/Music/soundboard";

  const files = fs.readdirSync(audioFilesDir).map((file) => ({
    name: file,
    value: file,
    description: "",
  }));

  const answer = await select(
    {
      message: "Select an audio file to play",
      choices: files,
      loop: true,
      default: lastValue,
    },
    { clearPromptOnDone: true }
  );
  lastValue = answer;

  const audioFilePath = path.join(audioFilesDir, answer);
  exec(`ffplay -v 0 -nodisp -autoexit '${audioFilePath}'`);
  run();
};

clear();
run();
