import { PythonShell } from "python-shell";

const options = {
  mode: "text",
  pythonPath: "/Users/future/miniconda3/envs/decowrite/bin/python",
  pythonOptions: ["-u"],
  scriptPath: "../../python/"
};

export default (script, callback) => {
  PythonShell.run(script, options, callback);
};
