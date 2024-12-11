"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  bookingCode: z.string().optional(),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export default function ContactSupport() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      bookingCode: "",
      email: "",
      message: "",
    },
  })

  async function onSubmit() {
    try {
      setIsSubmitting(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 5000))
      setShowConfirmation(true)
    } catch (error) {
      console.error("Failed to send message", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleCloseConfirmation() {
    setShowConfirmation(false)
    router.push("/")
  }

  return (
    <section className="py-12 px-4 md:px-6">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold text-center mb-8">Contact Support</h2>
        <div className="max-w-md mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bookingCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Booking Code (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your booking code" {...field} />
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Type your message here"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Sent</DialogTitle>
            <DialogDescription>
              {form.getValues().bookingCode
                ? `Request cancellation for booking #${form.getValues().bookingCode} sent. We'll get back to you shortly.`
                : "Your message has been sent. We'll get back to you shortly."}
            </DialogDescription>
          </DialogHeader>
          <Button onClick={handleCloseConfirmation}>Close</Button>
        </DialogContent>
      </Dialog>
    </section>
  )
}

