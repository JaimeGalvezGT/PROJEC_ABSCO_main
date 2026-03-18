import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Loader2, CheckCircle, MapPin, Phone, Mail, User } from "lucide-react";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import emailjs from "@emailjs/browser";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [formState, setFormState] = useState("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState("loading");

    try {
      await emailjs.send(
        "service_lo77brf",
        "template_pc3zkqf",
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        },
        "JXkbAllBs2IGgw6UK"
      );

      setFormState("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      setFormState("error");
    }

    setTimeout(() => setFormState("idle"), 5000);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-[#3b82f6]/5 rounded-full blur-[120px] pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl text-white mb-6">
              Let’s Talk About Your Project
            </h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <MapPin /> <span>Los Angeles, CA</span>
              </div>
              <div className="flex gap-4">
                <Phone /> <span>(213) 718-5185</span>
              </div>
              <div className="flex gap-4">
                <Mail /> <span>abscocleaning@yahoo.com</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT FORM */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-[#0f111a] p-8 rounded-2xl space-y-6"
            >
              <Input
                placeholder="Name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />

              <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />

              <Input
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />

              <Textarea
                placeholder="Message"
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                required
              />

              <button type="submit" disabled={formState === "loading"}>
                {formState === "loading" && <Loader2 className="animate-spin" />}
                {formState === "success" && <CheckCircle />}
                {formState === "idle" && <Send />}
                Send Message
              </button>

              {formState === "success" && (
                <motion.p className="text-green-400 text-center">
                  Thank you! We'll get back to you shortly.
                </motion.p>
              )}
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};