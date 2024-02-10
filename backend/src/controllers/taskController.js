import { PrismaClient } from "@prisma/client";
import { matchedData } from "express-validator";
import { StatusCodes } from "http-status-codes";

import asyncErrorHandler from "../utils/AsyncErrorHandler.js";

const prisma = new PrismaClient();

export const getAllTasks = asyncErrorHandler(async (req, res) => {});

export const getCurrentUserTasks = asyncErrorHandler(async (req, res) => {
  const { status } = matchedData(req);
  const { userId } = req.user;

  const task = await prisma.task.findMany({
    where: {
      userId: Number(userId),
      status,
    },
  });

  res.status(StatusCodes.OK).json({ status: "success", task: task });
});

export const createTask = asyncErrorHandler(async (req, res) => {
  const { title, description, priority, status, tag } = matchedData(req);
  const { userId } = req.user;

  const task = await prisma.task.create({
    data: {
      title,
      description,
      priority,
      status,
      tag,
      userId,
    },
  });

  res
    .status(StatusCodes.OK)
    .json({ status: "success", message: "Task created!" });
});

export const updateTaskById = asyncErrorHandler(async (req, res) => {
  const data = matchedData(req);
  const taskId = data.taskId;

  // remove the taskId from params
  delete data.taskId;

  const task = await prisma.task.update({
    where: { id: +taskId },
    data: data,
  });

  res
    .status(StatusCodes.OK)
    .json({ status: "success", message: "Task updated!" });
});

export const deleteTaskById = asyncErrorHandler(async (req, res) => {
  const { taskId } = matchedData(req);

  const task = await prisma.task.delete({
    where: { id: +taskId },
  });

  res
    .status(StatusCodes.OK)
    .json({ status: "success", message: "Task deleted!" });
});
