import { ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";

const dynamicPhrases = [
  "Award-winning Originals ✨",
  "Blockbusters & Classics 🎬",
  "TV for the Whole Family 👨‍👩‍👧‍👦",
  "Watch Anywhere, Anytime 📱💻📺",
  "Cancel Anytime 🚫💳",
];

// const testimonials = [
//   {
//     name: "Alex",
//     quote: "Flicksy changed how I watch movies forever!",
//     image: "public/images/profile.png",
//   },
//   {
//     name: "Jaya",
//     quote: "Streaming has never been this smooth.",
//     image: "public/images/profile.png",
//   },
//   {
//     name: "Emma",
//     quote: "My kids love it. And I do too!",
//     image: "public/images/profile.png",
//   },
// ];

const AuthScreen = () => {
  const [email, setEmail] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [time, setTime] = useState(new Date());
  // const [testimonialIndex, setTestimonialIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const phraseTimer = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % dynamicPhrases.length);
    }, 3000);

    const clockTimer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // const testimonialTimer = setInterval(() => {
    //   setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    // }, 5000);

    return () => {
      clearInterval(phraseTimer);
      clearInterval(clockTimer);
      // clearInterval(testimonialTimer);
    };
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    navigate("/signup?email=" + email);
  };

  // const currentTestimonial = testimonials[testimonialIndex];

  return (
    <div className="hero-bg">
      {/* Navbar */}
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4 ">
        <img
          src="/images/flicksy_logo.png"
          alt="Flicksy Logo"
          className="w-32 md:w-52"
        />
        <Link
          to={"/login"}
          className="bg-blue-600 text-xl text-white flex items-center justify-center px-6 py-0 rounded hover:bg-blue-500 transition h-12"
        >
          Sign In
        </Link>
      </header>

      {/* hero section */}
      <div className="flex flex-col items-center justify-center text-center py-40 -mt-5 text-white max-w-6xl mx-auto pt-25">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 mx-auto text-[4rem] font-bold text-transparent bg-[url('https://images.unsplash.com/photo-1725714354604-cacdb5c9a027?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-[length:200%] bg-[0_50%] bg-clip-text [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] animate-[bgMove_5s_infinite_alternate_linear] ">
          {" "}
          Unlimited Movies , TV Shows and More{" "}
        </h1>
        <p className="text-xl mb-2 animate-bounce text-blue-300">
          {dynamicPhrases[phraseIndex]}
        </p>
        <p className="mb-4">
          Current Time:{" "}
          <span className="text-blue-400 font-mono">
            {time.toLocaleTimeString()}
          </span>
        </p>
        <p className="mb-4">
          Ready to watch? Enter your Email to create or restart your membership
        </p>
        <form
          className="flex flex-col md:flex-row gap-4 w-1/2 h-12"
          onSubmit={handleFormSubmit}
        >
          <input
            type="email"
            required
            placeholder="Email address"
            className="p-4 rounded flex-1 bg-black/80 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-xl flex items-center justify-center px-6 py-3 rounded hover:bg-blue-500 transition"
          >
            Get Started <ChevronRight className="ml-2 size-6" />
          </button>
        </form>
      </div>

      {/* separator */}
      <div className="h-1 w-full bg-sky-500 mt-17" aria-hidden="true" />

      {/* 1st section */}
      <div
        className="py-10  text-white inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 100%, #000000 40%, #010133 100%)",
        }}
      >
        <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2">
          {/* left side */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Enjoy on your TV
            </h2>
            <p className="text-lg md:text-xl">
              Watch on SmartTV s Play Station ,Xbox Chromecast ,Apple TV ,sky
              Ray Players, and more.
            </p>
          </div>
          {/* right side */}
          <div className="flex-1 relative">
            <img
              src="/assets/tv.png"
              alt="Tv image"
              className="mt-4 z-20 relative"
            />
            <video
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 z-10"
              playsInline
              autoPlay={true}
              muted
              loop
            >
              <source src="/assets/hero-vid.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* separator */}
      <div className="h-1 w-full bg-sky-500" aria-hidden="true" />

      {/* 2nd section */}
      <div
        className="py-10 text-white inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 100%, #000000 40%, #010133 100%)",
        }}
      >
        <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2">
          {/* left side */}
          <div className="flex-1">
            <div className=" relative">
              <img
                src="/assets/stranger-things-lg.png"
                alt="Stranger Things img"
                className="mt-4"
              />

              <div className=" flex items-center gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 bg-black w-3/4 lg:w-1/2 h-24  border border-slate-500 rounded-md px-2">
                <img
                  src="/assets/stranger-things-sm.png"
                  alt="image"
                  className="h-full"
                />
                <div className="flex justify-between items-center w-full">
                  <div className="flex flex-col gap-0">
                    <span className="text-md lg:text-lg font-bold">
                      {" "}
                      Stranger Things
                    </span>
                    <span className="text-sm text-sky-500">Downloading...</span>
                  </div>
                  <img src="assets/download-icon.gif" alt="" className="h-12" />
                </div>
              </div>
            </div>
          </div>
          {/* right side */}
          <div className="flex-1 md:text-left text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Download your shows to watch offline
            </h2>
            <p className="text-lg md:text-xl">
              Save your favourites easily and always have something to watch.
            </p>
          </div>
        </div>
      </div>

      {/* separator */}
      <div className="h-1 w-full bg-sky-500" aria-hidden="true" />

      {/* 3rd section */}
      <div
        className="py-10 bg-black text-white inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 100%, #000000 40%, #010133 100%)",
        }}
      >
        <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2">
          {/* left side */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Watch everywhere
            </h2>
            <p className="text-lg md:text-xl">
              Stream unlimited movies and TV shows on your phone, tablets,
              laptop and TV.
            </p>
          </div>
          {/* right side */}
          <div className="flex-1 relative overflow-hidden">
            <img
              src="/assets/device-pile.png"
              alt="Device image"
              className="mt-4 z-20 relative"
            />
            <video
              className="absolute top-2 left-1/2 -translate-x-1/2  h-4/6 z-10 max-w-[63%]"
              playsInline
              autoPlay={true}
              muted
              loop
            >
              <source src="/assets/video-devices.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* separator */}
      <div className="h-1 w-full bg-sky-500" aria-hidden="true" />

      {/* 4th section */}
      <div
        className="py-10 text-white inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 100%, #000000 40%, #010133 100%)",
        }}
      >
        <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2">
          {/* left side */}
          <div className="flex-1">
            <div className=" relative">
              <img
                src="/assets/kids.png"
                alt="Stranger Things img"
                className="mt-4"
              />
            </div>
          </div>
          {/* right side */}
          <div className="flex-1 md:text-left text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Create profiles for kids{" "}
            </h2>
            <p className="text-lg md:text-xl">
              Send kids on adventures with their favourite characters in a space
              made just for them-free with your membership
            </p>
          </div>
        </div>
      </div>

      {/* separator */}
      <div className="h-1 w-full bg-sky-500" aria-hidden="true" />

      {/* <div className="py-20 bg-gradient-to-r from-blue-950 to-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            key={testimonialIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={currentTestimonial.image}
              alt={currentTestimonial.name}
              className="mx-auto w-20 h-20 rounded-full border-4 border-blue-400 mb-4"
            />
            <p className="text-lg italic mb-2">"{currentTestimonial.quote}"</p>
            <p className="font-bold text-blue-400">
              - {currentTestimonial.name}
            </p>
          </motion.div>
        </div>
      </div> */}

      {/* separator */}
      <div className="h-1 w-full bg-sky-500" aria-hidden="true" />

      {/* Interactive FAQ Section */}
      <div className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          {[
            {
              q: "Can I cancel anytime?",
              a: "Yes, cancel whenever you like with no fees.",
            },
            {
              q: "What can I watch on Flicksy?",
              a: "You can watch thousands of movies and TV shows.",
            },
            {
              q: "Is Flicksy suitable for kids?",
              a: "Yes! Flicksy has dedicated kids' profiles.",
            },
          ].map((faq, i) => (
            <details
              key={i}
              className="mb-4 border border-blue-700 rounded p-4"
            >
              <summary className="cursor-pointer text-lg font-semibold">
                {faq.q}
              </summary>
              <p className="mt-2 text-blue-200">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>

      {/* Live Stats Section */}
      <div className="py-20 bg-gradient-to-b from-black to-blue-950 text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-blue-400">10K+</p>
            <p>Movies Available</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-blue-400">50M+</p>
            <p>Active Users</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-blue-400">120</p>
            <p>Countries Served</p>
          </div>
        </div>
      </div>

      {/* Animated CTA */}
      <div className="py-16 bg-gradient-to-b from-black from-10% to-transparent text-white text-center animate-pulse">
        <h2 className="text-3xl font-bold mb-4">Ready to dive in?</h2>
        <p className="mb-6">Sign up now and get your first month FREE 🎉</p>
        <Link
          to="/signup"
          className="inline-block bg-white text-blue-700 font-bold px-6 py-3 rounded shadow-lg hover:bg-gray-100 transition"
        >
          Join Flicksy Today
        </Link>
      </div>
      <Footer />
    </div>
  );
};
export default AuthScreen;
