import { CalendarFold, Tag } from "lucide-react";
import { format } from "date-fns";
import Badge from "../Badge";
import { Separator } from "../ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ITask } from "@/types";
import TaskActionButton from "./TaskActionButton";

type TaskCardProps = {
  task: ITask;
};

const TaskCard = ({ task }: TaskCardProps) => {
  const dateFormatted = format(task.createdAt, "dd MMM yy");

  return (
    <Card className="w-[350px]">
      <CardHeader className="p-4">
        <div className="flex justify-between">
          <div className="flex gap-6 items-center">
            <div className="flex text-sm items-center gap-2 font-light text-muted-foreground">
              <Tag size={14} />
              <CardDescription className="">{task.tag}</CardDescription>
            </div>
            <div className="flex items-center font-light gap-2 text-muted-foreground">
              <CalendarFold size={14} />
              <CardDescription>{dateFormatted}</CardDescription>
            </div>
          </div>
          <Badge variant={task.priority} text={task.priority} />
        </div>
      </CardHeader>
      <CardContent className="space-y-2 px-4 pb-4">
        <CardTitle>{task.title}</CardTitle>
        <CardDescription>{task.description}</CardDescription>
      </CardContent>
      <Separator />
      <CardFooter className="p-4 justify-between items-center">
        <Badge variant={task.status} text={task.status} />
        <TaskActionButton task={task} />
      </CardFooter>
    </Card>
  );
};

export default TaskCard;