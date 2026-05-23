import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ExternalLink } from "lucide-react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { useSubmitLead } from "@workspace/api-client-react";
import type { LeadInput } from "@workspace/api-client-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DemoModal } from "@/components/ui/DemoModal";
import { getWhatsAppUrl, WHATSAPP_ENABLED } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;

const clientTypeOptions = [
  { value: "letting_agency", label: "Letting Agency" },
  { value: "independent_landlord", label: "Independent Landlord" },
  { value: "serviced_accommodation", label: "Serviced Accommodation Operator" },
  { value: "airbnb_host", label: "Airbnb Host" },
  { value: "other", label: "Other" },
] as const;

const leadFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  company: z.string().optional(),
  clientType: z.enum(["letting_agency", "independent_landlord", "serviced_accommodation", "airbnb_host", "other"], {
    required_error: "Please select a client type",
  }),
  message: z.string().optional(),
});

type LeadFormValues = z.infer<typeof leadFormSchema>;

export default function LeadForm() {
  const [success, setSuccess] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [turnstileErrored, setTurnstileErrored] = useState(false);
  const turnstileRef = useRef<TurnstileInstance>(null);
  const submitLead = useSubmitLead();

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  function onSubmit(data: LeadFormValues) {
    const body: LeadInput & { cf_turnstile_response?: string } = {
      name: data.name,
      email: data.email,
      company: data.company ?? null,
      clientType: data.clientType,
      message: data.message ?? null,
      sourcePage: "home",
    };

    if (TURNSTILE_SITE_KEY && turnstileToken) {
      body.cf_turnstile_response = turnstileToken;
    }

    submitLead.mutate(
      { data: body as LeadInput },
      {
        onSuccess: () => {
          setSuccess(true);
          form.reset();
          setTurnstileToken("");
          setTurnstileErrored(false);
          trackEvent("enquiry_submitted", { clientType: data.clientType, sourcePage: "home" });
        },
        onError: () => {
          turnstileRef.current?.reset();
          setTurnstileToken("");
        },
      }
    );
  }

  const whatsappUrl = getWhatsAppUrl("Hi, I've just submitted an enquiry via the VIDERO website and would like to follow up.");

  // Ready when: no key configured, token received, OR widget errored (graceful degradation)
  const turnstileReady = !TURNSTILE_SITE_KEY || !!turnstileToken || turnstileErrored;

  return (
    <>
      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />

      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="py-10 space-y-7"
          >
            {/* Icon + heading */}
            <div className="space-y-4">
              <div className="w-10 h-10 flex items-center justify-center" style={{ background: "linear-gradient(135deg,#7B2FE8,#3F60F0)" }}>
                <CheckCircle className="w-5 h-5 text-white" strokeWidth={1.5} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-serif text-white">Enquiry Received</h3>
                <p className="text-sm text-white/50 font-light leading-relaxed max-w-sm">
                  Thanks for reaching out. We've received your enquiry and will contact you shortly via email.
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-white/10" />

            {/* Action buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setDemoOpen(true);
                  trackEvent("demo_modal_opened", { source: "success_card" });
                }}
                className="inline-flex h-11 items-center justify-center gap-2 border border-white/20 text-white/70 px-6 text-sm font-medium tracking-wide transition-colors hover:border-white/50 hover:text-white w-full"
              >
                <ExternalLink className="w-4 h-4" />
                View Demo Examples
              </button>

              {WHATSAPP_ENABLED && whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("whatsapp_cta_clicked", { source: "success_card" })}
                  className="inline-flex h-11 items-center justify-center gap-2 gradient-bg text-white px-6 text-sm font-medium tracking-wide transition-opacity hover:opacity-90 w-full"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.55 4.1 1.514 5.826L.057 23.454a.75.75 0 0 0 .918.918l5.628-1.457A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.716 9.716 0 0 1-4.953-1.352l-.355-.21-3.678.953.975-3.566-.23-.367A9.716 9.716 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                  </svg>
                  Continue on WhatsApp
                </a>
              )}

              <button
                onClick={() => setSuccess(false)}
                className="text-xs text-white/25 hover:text-white/50 transition-colors pt-1 text-center"
              >
                Submit another enquiry
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="dark-form"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Full name" data-testid="input-name" {...field} />
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
                          <Input placeholder="Email address" data-testid="input-email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organisation (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Organization name" data-testid="input-company" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="clientType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Client Type</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value ?? ""}>
                          <FormControl>
                            <SelectTrigger data-testid="select-client-type">
                              <SelectValue placeholder="Please Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {clientTypeOptions.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Outline your requirements or property volume..."
                          className="min-h-[100px]"
                          data-testid="textarea-message"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Turnstile widget — only renders when site key is configured and widget hasn't errored */}
                {TURNSTILE_SITE_KEY && !turnstileErrored && (
                  <div>
                    <Turnstile
                      ref={turnstileRef}
                      siteKey={TURNSTILE_SITE_KEY}
                      onSuccess={(token) => { setTurnstileToken(token); setTurnstileErrored(false); }}
                      onExpire={() => setTurnstileToken("")}
                      onError={() => { setTurnstileToken(""); setTurnstileErrored(true); }}
                      options={{ theme: "dark", size: "normal", retry: "never" }}
                    />
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={submitLead.isPending || !turnstileReady}
                  data-testid="button-submit"
                >
                  {submitLead.isPending ? "Submitting..." : "Submit Details"}
                </Button>
              </form>
            </Form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
