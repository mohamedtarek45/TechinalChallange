import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAddLeads, useGetLead, useUpdateLead } from "@/api/Data";

const formSchema = z.object({
  name: z.string().nonempty({
    message: "please enter name",
  }),
  email: z.string().email(),
  status: z.enum(["new", "in_progress", "completed"], {
    message: "Invalid status. Choose one of: New, In progress, or Completed.",
  }),
});
const LeadPage = () => {
  const nav=useNavigate();
  const { isError, isPending, CreateLead } = useAddLeads();
  const {
    UpeateLead,
    isError: isErrorUpdate,
    isPending: isPendingUpdate,
  } = useUpdateLead();
  const { id } = useParams();
  const { lead, isPending: isPendingLead } = useGetLead(id);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });
  useEffect(() => {
    if (id && lead) {
      console.log(lead);
      form.reset(lead);
    }
  }, [form, lead]);

  async function onSubmit(values) {
    console.log("values", values);
    if (id) {
      await UpeateLead({ jsonData: values, id });
    } else {
      await CreateLead(values);
    }
    nav("/")
  }
  if (isPending) {
    return <p>Loading...</p>;
  }
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) => {
            console.error("Form validation failed:", errors);
          })}
          className="space-y-8 w-[60%]"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@email.com" {...field} />
                </FormControl>
                <FormDescription>Enter your email.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                {console.log("field.value", field.value)}
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  ref={field.ref}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Select Status</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className={"w-full flex justify-center space-x-4"}>
            <Button
            type="button"
              variant="outline"
              className="hover:cursor-pointer"
              onClick={() => nav("/")}
            >
              Back
            </Button>
            <Button className={"hover:cursor-pointer"} type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LeadPage;
