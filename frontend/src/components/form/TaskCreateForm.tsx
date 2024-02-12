import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useCreateTask from "@/hooks/useCreateTask";

const EditUserValidationSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(128, "First Name must contain at most 255 character(s)"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(128, " must contain at monst 1024 character(s)"),
  priority: z.enum(["low", "normal", "high", "urgent", ""]),
  status: z.enum(["started", "in_progress", "completed", ""]),
  tag: z.string(),
});

const TaskCreateForm = () => {
  const { mutate: createTask, isPending } = useCreateTask();

  const form = useForm<z.infer<typeof EditUserValidationSchema>>({
    resolver: zodResolver(EditUserValidationSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "",
      status: "",
      tag: "",
    },
  });

  function onSubmit(values: z.infer<typeof EditUserValidationSchema>) {
    createTask(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tag"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tag</FormLabel>
              <FormControl>
                <Input placeholder="tag" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Input placeholder="status" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <FormControl>
                <Input placeholder="priority" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          {isPending ? <Loader2 className="animate-spin" /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default TaskCreateForm;
