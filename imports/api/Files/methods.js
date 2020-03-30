import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import fse from "fs-extra";
import Files from "./Files";

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
    Meteor.Ob;
    return {
      data: Files.findOne({ _id: new Mongo.ObjectID(_id) })
    };
  }
});
