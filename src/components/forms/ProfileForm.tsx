import { ProfileValidation } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as  z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import FileUploader from "../shared/FileUploader"
import { useUserContext } from "@/context/AuthContext"
import { useNavigate, useParams } from "react-router-dom"
import { useGetUserById, useUpdateUser } from "@/lib/react-query/queriesAndMutations"
import { toast } from "../ui/use-toast"

const ProfileForm = () => {
  const { user, setUser } = useUserContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: currentUser } = useGetUserById(id || "");
  console.log("currentuser")
  console.log(currentUser);
  const { mutateAsync: updateUser } = useUpdateUser();


  // 1. Define your form.
  const form = useForm<z.infer<typeof ProfileValidation>>({
    resolver: zodResolver(ProfileValidation),
    defaultValues: {
      name: user.name,
      username: user.username,
      email: user.email,
      bio: user.bio || "",
      file: [],
    },
  })

  // 2. Define a submit handler.
  const handleUpdate =  async (value: z.infer<typeof ProfileValidation>) => {
      const updatedUser = await updateUser({
        userId: currentUser?.$id,
        name: value.name,
        username: value.username,
        email: value.email,
        bio: value.bio,
        file: value.file,
        imageId: currentUser?.imageId,
        imageUrl: currentUser?.imageUrl,
      })

      if(!updateUser) {
        toast({ title: "Uh oh! Please try again!" })
      }

      setUser({
        ...user,
        name: updatedUser?.name,
        username: updatedUser?.username,
        email: updatedUser?.email,
        bio: updatedUser?.bio,
        imageUrl: updateUser?.imageUrl,
      });
      
      toast({ title: "User profile updated!" })
      return navigate(`/profile/${id}`);
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleUpdate)} className="flex flex-col gap-9 w-full max-w-5xl">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Name</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Username</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Email</FormLabel>
              <FormControl>
                <Input type="email" className="shad-input" placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Bio</FormLabel>
              <FormControl>
              <Textarea className="shad-textarea custom-scrollbar" placeholder="Type a few words about yourself here! Max 500 characters" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Change Avatar</FormLabel>
              <FormControl>
                <FileUploader 
                fieldChange={field.onChange}
                mediaUrl={user?.imageUrl}
                {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <div className="flex gap-4 items-center justify-end">
          <Button className="shad-button_dark_4" type="button" onClick={() => navigate(-1)}>Cancel</Button>
          <Button
            className="shad-button_primary whitespace-nowrap"
            type="submit"
          >
            Update Profile
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ProfileForm
