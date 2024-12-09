import ContactUs from "@/components/contact-us/ContactUs";

export default function Contact() {
  return (
    <div className="min-h-screen">
      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold">Contact Us</h3>
          <p className="mt-4 text-lg">
            Get in touch with us for more information about our courses and
            enrollment.
          </p>
          {/* <a href="mailto:info@codemaster.com" className="mt-6 inline-block bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-500">Email Us</a> */}
          <ContactUs />
        </div>
      </section>
    </div>
  );
}
