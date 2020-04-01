import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import fse from "fs-extra";
import Files from "./Files";
import { PythonShell } from "python-shell";

const pythonShellOptions = {
  mode: "text",
  pythonPath: Meteor.settings.PYTHON_PATH,
  pythonOptions: ["-u"],
  scriptPath: Meteor.settings.SCRIPT_PATH
};

Meteor.methods({
  "file.upload": ({ title, author, userId, fileData }) => {
    const dir = process.cwd() + "/upload/";
    const timestamp = new Date().getTime();
    const file = `${dir}${timestamp}.txt`;
    fse.outputFile(file, fileData, err => {
      if (err) {
        console.log(err);
        throw err;
      } else {
        console.log(`Received file ${title}.txt : OK`);
      }
    });
    return Files.insert({
      author,
      title,
      userId,
      file,
      status: "WAITING",
      analysis: {},
      createdAt: new Date(),
      updatedAt: new Date()
    });
  },
  "file.insert": ({ author, title, userId, file, status = "WAITING" }) => {
    return Files.insert({
      author,
      title,
      userId,
      file,
      status,
      analysis: {},
      createdAt: new Date(),
      updatedAt: new Date()
    });
  },
  "file.upsert": ({ _id, author, file, status, analysis }) => {
    return Files.upsert(
      {
        _id: _id || new Mongo.ObjectID()
      },
      {
        $set: {
          author,
          file,
          status,
          analysis,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      }
    );
  },
  "file.getMyBooks": ({ userId }) => {
    return {
      data: Files.find(
        { userId },
        { limit: 10, sort: { updatedAt: -1 } }
      ).fetch(),
      count: Files.find({ userId }).count()
    };
  },
  "file.getAllBooks": () => {
    return {
      data: Files.find(
        { status: "SUCCESS" },
        { limit: 10, sort: { updatedAt: -1 } }
      ).fetch(),
      count: Files.find({ status: "SUCCESS" }).count()
    };
  },
  "file.getOneBook": ({ _id }) => {
    return {
      data: Files.findOne({ _id: new Mongo.ObjectID(_id) })
    };
  },
  "file.callPythonLogic": objectId => {
    const ePythonShellOptions = {
      ...pythonShellOptions,
      args: [objectId._str]
    };
    PythonShell.run("analysis.py", ePythonShellOptions, (err, result) => {
      if (err) throw err;
      console.log(result);
      return result[1];
    });
  }
});
