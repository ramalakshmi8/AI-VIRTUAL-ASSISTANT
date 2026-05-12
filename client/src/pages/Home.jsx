// import React, { useEffect, useRef } from "react";
// import { useUser } from "../context/UserContext.jsx";
// import { useNavigate } from "react-router-dom";
// import aiImg from "../assets/ai.gif";
// import userImg from "../assets/user.gif";
// import { BiMenuAltRight } from "react-icons/bi";
// import { AiOutlineClose } from "react-icons/ai";
// import { CgMenu } from "react-icons/cg";
// import axios from "axios";

// const Home = () => {
//   const { userData, serverUrl, setUserData, getGeminiResponse } = useUser();

//   const navigate = useNavigate();

//   // ---------------- REFS ----------------
//   const recognitionRef = useRef(null);
//   const stateRef = useRef("idle");

//   const assistantName = userData?.assistantName?.toLowerCase();
//   const [userText, setUserText] = React.useState("");
//   const [aiText, setAiText] = React.useState("");
//   const [ham, setHam] = React.useState(false);

//   // ---------------- LOGOUT ----------------
//   const handleLogOut = async () => {
//     try {
//       await axios.get(`${serverUrl}/api/auth/logout`, {
//         withCredentials: true,
//       });

//       setUserData(null);

//       navigate("/signin");
//     } catch (error) {
//       console.log("Logout Error:", error);
//     }
//   };
//   //Handle commands//
//   const handleCommand = (data) => {
//     const { type, userInput, response } = data;
//     if (type === "google_search") {
//       const query = encodeURIComponent(userInput);
//       window.open(`https://www.google.com/search?q=${query}`, "_blank");
//     }
//     if (type === "calculator_open") {
//       window.open(`https://www.google.com/search?q=calculator`, "_blank");
//     }
//     if (type === "instagram_open") {
//       window.open(`https://www.instagram.com/`, "_blank");
//     }
//     if (type === "facebook_open") {
//       window.open(`https://www.facebook.com/`, "_blank");
//     }
//     if (type === "weather_show") {
//       window.open(`https://www.google.com/search?q=weather`, "_blank");
//     }
//     if (type === "youtube_search") {
//       const query = encodeURIComponent(userInput);
//       window.open(
//         `https://www.youtube.com/results?search_query=${query}`,
//         "_blank",
//       );
//     }
//     if (type === "youtube_play") {
//       const query = encodeURIComponent(userInput);
//       window.open(
//         `https://www.youtube.com/results?search_query=${query}`,
//         "_blank",
//       );
//     }
//   };

//   // ---------------- LOAD VOICES ----------------
//   const loadVoices = () => {
//     return new Promise((resolve) => {
//       let voices = window.speechSynthesis.getVoices();

//       if (voices.length > 0) {
//         resolve(voices);
//         return;
//       }

//       window.speechSynthesis.onvoiceschanged = () => {
//         voices = window.speechSynthesis.getVoices();
//         resolve(voices);
//       };
//     });
//   };
//   // ---------------- DETECT LANGUAGE ----------------
//   const detectLanguage = (text) => {
//     // Telugu Unicode Range
//     const teluguRegex = /[\u0C00-\u0C7F]/;

//     if (teluguRegex.test(text)) {
//       return "te";
//     }

//     return "en";
//   };

//   // ---------------- SPEAK ----------------
//   const speak = async (text) => {
//     return new Promise(async (resolve) => {
//       try {
//         // stop previous speech
//         window.speechSynthesis.cancel();
//         window.speechSynthesis.resume();

//         const utterance = new SpeechSynthesisUtterance(text);

//         const voices = await loadVoices();

//         // // select english voice
//         // const selectedVoice =
//         //   voices.find((v) => v.lang.includes("en")) || voices[0];

//         // if (selectedVoice) {
//         //   utterance.voice = selectedVoice;
//         // }

//         // utterance.lang = "en-US";

//         const language = detectLanguage(text);

//         let selectedVoice;

//         if (language === "te") {
//           // Telugu Voice
//           selectedVoice =
//             voices.find(
//               (v) => v.lang === "te-IN" || v.lang.toLowerCase().includes("te"),
//             ) || voices[0];

//           utterance.lang = "te-IN";
//         } else {
//           // English Voice
//           selectedVoice =
//             voices.find(
//               (v) => v.lang === "en-US" || v.lang.toLowerCase().includes("en"),
//             ) || voices[0];

//           utterance.lang = "en-US";
//         }

//         if (selectedVoice) {
//           utterance.voice = selectedVoice;
//         }
//         utterance.rate = 1;
//         utterance.pitch = 1;
//         utterance.volume = 1;

//         utterance.onstart = () => {
//           console.log("🔊 Speaking...");
//           stateRef.current = "speaking";
//         };

//         utterance.onend = () => {
//           setAiText("");
//           console.log("✅ Speech Finished");

//           stateRef.current = "listening";

//           resolve();
//         };

//         utterance.onerror = (err) => {
//           console.log("Speech Error:", err);

//           stateRef.current = "listening";

//           resolve();
//         };

//         window.speechSynthesis.speak(utterance);
//       } catch (error) {
//         console.log("Speak Error:", error);

//         stateRef.current = "listening";

//         resolve();
//       }
//     });
//   };
//   useEffect(() => {
//     if (!assistantName) return;

//     const greetUser = async () => {
//       const hour = new Date().getHours();

//       let greeting = "";

//       if (hour < 12) {
//         greeting = "Good Morning";
//       } else if (hour < 17) {
//         greeting = "Good Afternoon";
//       } else {
//         greeting = "Good Evening";
//       }

//       await speak(
//         `${greeting} ${userData?.name}. I am ${assistantName}. How can I help you today?`,
//       );
//     };

//     // greet automatically when page opens
//     setTimeout(() => {
//       greetUser();
//     }, 1000);
//   }, []);
//   // ---------------- VOICE ASSISTANT ----------------
//   useEffect(() => {
//     if (!assistantName) return;

//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       console.log("Speech Recognition not supported");
//       return;
//     }

//     const recognition = new SpeechRecognition();

//     recognitionRef.current = recognition;

//     recognition.continuous = false;
//     recognition.lang = "en-US";
//     recognition.interimResults = false;

//     console.log("🤖 Assistant Initialized");

//     // ---------------- START LISTENING ----------------
//     const startListening = () => {
//       try {
//         if (stateRef.current === "listening") {
//           recognition.start();
//           console.log("🎤 Listening...");
//         }
//       } catch (error) {
//         console.log("Start Listening Error:", error);
//       }
//     };

//     // ---------------- RESULT ----------------
//     recognition.onresult = async (event) => {
//       if (stateRef.current !== "listening") return;

//       const transcript = event.results[event.results.length - 1][0].transcript
//         .toLowerCase()
//         .trim();

//       console.log("🗣 User Said:", transcript);

//       // wake word check
//       if (!transcript.includes(assistantName)) {
//         console.log("❌ Wake word not detected");
//         return;
//       }
//       // userData.history.push(transcript);
//       setUserData((prev) => ({
//         ...prev,
//         history: [...prev.history, transcript],
//       }));
//       setAiText("");
//       console.log("✅ Wake word detected");

//       // stop listening
//       stateRef.current = "thinking";
//       setUserText(transcript);
//       recognition.stop();

//       try {
//         console.log("🧠 Thinking...");

//         const data = await getGeminiResponse(transcript);

//         console.log("🤖 Gemini Response:", data);
//         handleCommand(data);
//         setAiText(data.response);
//         setUserText("");

//         if (data?.response) {
//           await speak(data.response);
//         }

//         // restart listening
//         stateRef.current = "listening";

//         setTimeout(() => {
//           startListening();
//         }, 1000);
//       } catch (error) {
//         console.log("Gemini Error:", error);

//         stateRef.current = "listening";

//         setTimeout(() => {
//           startListening();
//         }, 1000);
//       }
//     };

//     // ---------------- ERROR ----------------
//     recognition.onerror = (event) => {
//       console.log("Recognition Error:", event.error);

//       if (event.error === "not-allowed") {
//         alert("Please allow microphone permission");
//       }

//       stateRef.current = "listening";

//       setTimeout(() => {
//         startListening();
//       }, 1000);
//     };

//     // ---------------- END ----------------
//     recognition.onend = () => {
//       console.log("🎤 Recognition Ended");

//       // restart only if still listening
//       if (stateRef.current === "listening") {
//         setTimeout(() => {
//           startListening();
//         }, 1000);
//       }
//     };

//     // ---------------- CLEANUP ----------------
//     return () => {
//       try {
//         recognition.stop();
//       } catch (err) {
//         console.log(err.message);
//       }

//       window.speechSynthesis.cancel();

//       stateRef.current = "idle";
//     };
//   }, [assistantName, getGeminiResponse]);

//   // ---------------- START ASSISTANT ----------------
//   const startAssistant = async () => {
//     try {
//       // activate speech system
//       window.speechSynthesis.resume();

//       stateRef.current = "listening";

//       await speak("Voice assistant activated");

//       // start listening
//       setTimeout(() => {
//         try {
//           recognitionRef.current?.start();
//           console.log("🎤 Assistant Started");
//         } catch (err) {
//           console.log(err);
//         }
//       }, 500);
//     } catch (error) {
//       console.log("Start Assistant Error:", error);
//     }
//   };
//   console.log(userData);
//   console.log(userData?.history);

//   // ---------------- UI ----------------
//   return (
//     <div className="w-full h-[100vh] bg-gradient-to-t from-black to-[#030353] flex items-center justify-center flex-col text-white gap-[20px]">
//       {/* START BUTTON */}
//       <CgMenu
//         onClick={() => setHam(true)}
//         className="lg:hidden text-white absolute top-[20px] right-[20px] w-[25px] h-[25px]"
//       />
//       <div
//         className={`w-full h-full absolute top-0 left-0 bg-[#00000070] backdrop-blur-lg flex flex-col gap-[20px] items-start p-[20px] z-50 transition-all duration-300 ${
//           ham ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         {/* <div className={ `w-full h-full absolute top-0 left-0 bg-[#00000070] backdrop-blur-lg flex flex-col gap-[20px] items-start p-[20px] z-50 ${ham?"translate-x-0":"translate-x-full"}` }> */}
//         {/* CLOSE ICON */}
//         <AiOutlineClose
//           onClick={() => setHam(false)}
//           className="text-white absolute top-[20px] right-[20px] w-[30px] h-[30px] cursor-pointer"
//         />

//         {/* LOGOUT */}
//         <button
//           onClick={handleLogOut}
//           className="min-w-[180px] h-[55px] bg-white text-black font-semibold rounded-full mt-[60px]"
//         >
//           Log Out
//         </button>

//         {/* CUSTOMIZE */}
//         <button
//           onClick={() => navigate("/customize")}
//           className="min-w-[180px] h-[55px] bg-white text-black font-semibold rounded-full"
//         >
//           Customize
//         </button>

//         {/* LINE */}
//         <div className="w-full h-[2px] bg-gray-400"></div>

//         {/* HISTORY */}
//         <h1 className="text-white font-semibold text-[19px]">History</h1>
//         {/* <div className="w-full h-[60%] overflow-auto flex flex-col gap-[20px]">
//     {userData.history?userData.history.map((his)=>(
//       <span>{his}</span>
//     ))}
//   </div> */}

//         <div className="w-full h-[60%] gap-[20px] overflow-y-auto flex flex-col">
//           {userData.history ? (
//             userData.history.map((his, index) => (
//               <span
//                 key={index}
//                 className="text-white  p-[10px] rounded-lg truncate"
//               >
//                 {his}
//               </span>
//             ))
//           ) : (
//             <p className="text-gray-400">No History Found</p>
//           )}
//         </div>
//       </div>

//       <button
//         onClick={startAssistant}
//         className="px-6 py-3 rounded-xl font-semibold
//   bg-white text-black
//   shadow-md
//   hover:bg-gray-100 hover:shadow-lg
//   active:scale-95
//   transition-all duration-200"
//       >
//         Start Assistant
//       </button>

//       {/* LOGOUT */}
//       <button
//         onClick={handleLogOut}
//         className="min-w-[150px] h-[60px] bg-white text-black font-semibold rounded-full absolute hidden lg:block top-[20px] right-[20px]"
//       >
//         Log Out
//       </button>

//       {/* CUSTOMIZE */}
//       <button
//         onClick={() => navigate("/customize")}
//         className="min-w-[150px] h-[60px] bg-white text-black font-semibold rounded-full absolute hidden lg:block top-[100px] right-[20px]"
//       >
//         Customize
//       </button>

//       {/* ASSISTANT IMAGE */}
//       <div className="w-[300px] h-[400px] flex items-center justify-center overflow-hidden rounded-4xl shadow-lg">
//         <img
//           src={userData?.assistantImage}
//           alt="assistant"
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* ASSISTANT NAME */}
//       <h1 className="text-white text-[18px] font-semibold">
//         I'm {userData?.assistantName}
//       </h1>
//       {!aiText && (
//         <img
//           src={userImg}
//           alt="user"
//           className="w-[200px] h-[70px] object-contain"
//         />
//       )}
//       {aiText && (
//         <img
//           src={aiImg}
//           alt="assistant"
//           className="w-[200px] h-[70px] object-contain"
//         />
//       )}
//       <h1 className="text-white text-[18px] font-semibold text-wrap">
//         {userText ? userText : aiText ? aiText : null}
//       </h1>
//     </div>
//   );
// };

// export default Home;

import React, { useEffect, useRef, useState } from "react";
import { useUser } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import aiImg from "../assets/ai.gif";
import userImg from "../assets/user.gif";
import { AiOutlineClose } from "react-icons/ai";
import { CgMenu } from "react-icons/cg";
import axios from "axios";

const Home = () => {
  const { userData, serverUrl, setUserData, getGeminiResponse } = useUser();

  const navigate = useNavigate();

  // ---------------- STATES ----------------
  const [userText, setUserText] = useState("");
  const [aiText, setAiText] = useState("");
  const [ham, setHam] = useState(false);

  // ---------------- REFS ----------------
  const recognitionRef = useRef(null);
  const stateRef = useRef("idle");
  const isRecognitionRunning = useRef(false);

  const assistantName = userData?.assistantName?.toLowerCase() || "assistant";

  // ---------------- LOGOUT ----------------
  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });

      setUserData(null);

      navigate("/signin");
    } catch (error) {
      console.log("Logout Error:", error);
    }
  };

  // ---------------- HANDLE COMMANDS ----------------
  const handleCommand = (data) => {
    const { type, userInput } = data;

    if (type === "google_search") {
      const query = encodeURIComponent(userInput);
      window.open(`https://www.google.com/search?q=${query}`, "_blank");
    }

    if (type === "calculator_open") {
      window.open(`https://www.google.com/search?q=calculator`, "_blank");
    }

    if (type === "instagram_open") {
      window.open(`https://www.instagram.com`, "_blank");
    }

    if (type === "facebook_open") {
      window.open(`https://www.facebook.com`, "_blank");
    }

    if (type === "weather_show") {
      window.open(`https://www.google.com/search?q=weather`, "_blank");
    }

    if (type === "youtube_search" || type === "youtube_play") {
      const query = encodeURIComponent(userInput);

      window.open(
        `https://www.youtube.com/results?search_query=${query}`,
        "_blank",
      );
    }
  };

  // ---------------- LOAD VOICES ----------------
  const loadVoices = () => {
    return new Promise((resolve) => {
      let voices = window.speechSynthesis.getVoices();

      if (voices.length > 0) {
        resolve(voices);
        return;
      }

      window.speechSynthesis.onvoiceschanged = () => {
        voices = window.speechSynthesis.getVoices();
        resolve(voices);
      };
    });
  };

  // ---------------- DETECT LANGUAGE ----------------
  const detectLanguage = (text) => {
    const teluguRegex = /[\u0C00-\u0C7F]/;

    if (teluguRegex.test(text)) {
      return "te";
    }

    return "en";
  };

  // ---------------- SPEAK ----------------
  const speak = async (text) => {
    return new Promise(async (resolve) => {
      try {
        window.speechSynthesis.cancel();
        window.speechSynthesis.resume();

        const utterance = new SpeechSynthesisUtterance(text);

        const voices = await loadVoices();

        const language = detectLanguage(text);

        let selectedVoice;

        if (language === "te") {
          selectedVoice =
            voices.find(
              (v) => v.lang === "te-IN" || v.lang.toLowerCase().includes("te"),
            ) || voices[0];

          utterance.lang = "te-IN";
        } else {
          selectedVoice =
            voices.find(
              (v) => v.lang === "en-US" || v.lang.toLowerCase().includes("en"),
            ) || voices[0];

          utterance.lang = "en-US";
        }

        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }

        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.volume = 1;

        utterance.onstart = () => {
          console.log("🔊 Speaking...");
          stateRef.current = "speaking";
        };

        utterance.onend = () => {
          console.log("✅ Speech Finished");
          stateRef.current = "listening";
          resolve();
        };

        utterance.onerror = (err) => {
          console.log("Speech Error:", err);
          stateRef.current = "listening";
          resolve();
        };

        window.speechSynthesis.speak(utterance);
      } catch (error) {
        console.log("Speak Error:", error);
        resolve();
      }
    });
  };

  // ---------------- GREETING ----------------
  useEffect(() => {
    if (!assistantName) return;

    const greetUser = async () => {
      const hour = new Date().getHours();

      let greeting = "";

      if (hour < 12) {
        greeting = "Good Morning";
      } else if (hour < 17) {
        greeting = "Good Afternoon";
      } else {
        greeting = "Good Evening";
      }

      await speak(
        `${greeting} ${userData?.name}. I am ${assistantName}. How can I help you today?`,
      );
    };

    setTimeout(() => {
      greetUser();
    }, 1000);
  }, []);

  // ---------------- VOICE ASSISTANT ----------------
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.log("Speech Recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();

    recognitionRef.current = recognition;

    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;

    console.log("🤖 Assistant Initialized");

    // ---------------- START LISTENING ----------------
    const startListening = () => {
      try {
        if (stateRef.current === "listening" && !isRecognitionRunning.current) {
          recognition.start();
        }
      } catch (error) {
        console.log("Start Listening Error:", error);
      }
    };

    // ---------------- ON START ----------------
    recognition.onstart = () => {
      console.log("🎤 Listening...");
      isRecognitionRunning.current = true;
    };

    // ---------------- RESULT ----------------
    recognition.onresult = async (event) => {
      if (stateRef.current !== "listening") return;

      const transcript = event.results[event.results.length - 1][0].transcript
        .toLowerCase()
        .trim();

      console.log("🗣 User Said:", transcript);

      // wake word check
      if (!transcript.includes(assistantName)) {
        console.log("❌ Wake word not detected");
        return;
      }

      setUserData((prev) => ({
        ...prev,
        history: [...(prev?.history || []), transcript],
      }));

      setAiText("");
      setUserText(transcript);

      console.log("✅ Wake word detected");

      stateRef.current = "thinking";

      recognition.stop();

      try {
        console.log("🧠 Thinking...");

        const data = await getGeminiResponse(transcript);

        console.log("🤖 Gemini Response:", data);

        handleCommand(data);

        setAiText(data?.response || "");
        setUserText("");

        if (data?.response) {
          await speak(data.response);
        }

        stateRef.current = "listening";

        setTimeout(() => {
          startListening();
        }, 1000);
      } catch (error) {
        console.log("Gemini Error:", error);

        stateRef.current = "listening";

        setTimeout(() => {
          startListening();
        }, 1000);
      }
    };

    // ---------------- ERROR ----------------
    recognition.onerror = (event) => {
      console.log("Recognition Error:", event.error);

      isRecognitionRunning.current = false;

      if (event.error === "not-allowed") {
        alert("Please allow microphone permission");
        return;
      }

      if (stateRef.current === "listening") {
        setTimeout(() => {
          startListening();
        }, 1000);
      }
    };

    // ---------------- END ----------------
    recognition.onend = () => {
      console.log("🎤 Recognition Ended");

      isRecognitionRunning.current = false;

      if (stateRef.current === "listening") {
        setTimeout(() => {
          startListening();
        }, 1000);
      }
    };

    // ---------------- CLEANUP ----------------
    return () => {
      try {
        recognition.stop();
      } catch (err) {
        console.log(err.message);
      }

      window.speechSynthesis.cancel();

      stateRef.current = "idle";
      isRecognitionRunning.current = false;
    };
  }, [assistantName]);

  // ---------------- START ASSISTANT ----------------
  const startAssistant = async () => {
    try {
      window.speechSynthesis.resume();

      if (isRecognitionRunning.current) {
        console.log("Recognition already running");
        return;
      }

      stateRef.current = "listening";

      await speak("Voice assistant activated");

      setTimeout(() => {
        if (recognitionRef.current && !isRecognitionRunning.current) {
          recognitionRef.current.start();
        }
      }, 500);
    } catch (error) {
      console.log("Start Assistant Error:", error);
    }
  };

  // ---------------- UI ----------------
  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-black to-[#030353] flex items-center justify-center flex-col text-white gap-[20px]">
      {/* MENU ICON */}
      <CgMenu
        onClick={() => setHam(true)}
        className="lg:hidden text-white absolute top-[20px] right-[20px] w-[25px] h-[25px]"
      />

      {/* SIDEBAR */}
      <div
        className={`w-full h-full absolute top-0 left-0 bg-[#00000070] backdrop-blur-lg flex flex-col gap-[20px] items-start p-[20px] z-50 transition-all duration-300 ${
          ham ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <AiOutlineClose
          onClick={() => setHam(false)}
          className="text-white absolute top-[20px] right-[20px] w-[30px] h-[30px] cursor-pointer"
        />

        <button
          onClick={handleLogOut}
          className="min-w-[180px] h-[55px] bg-white text-black font-semibold rounded-full mt-[60px]"
        >
          Log Out
        </button>

        <button
          onClick={() => navigate("/customize")}
          className="min-w-[180px] h-[55px] bg-white text-black font-semibold rounded-full"
        >
          Customize
        </button>

        <div className="w-full h-[2px] bg-gray-400"></div>

        <h1 className="text-white font-semibold text-[19px]">History</h1>

        <div className="w-full h-[60%] gap-[20px] overflow-y-auto flex flex-col">
          {userData?.history?.length > 0 ? (
            userData.history.map((his, index) => (
              <span
                key={index}
                className="text-white p-[10px] rounded-lg truncate"
              >
                {his}
              </span>
            ))
          ) : (
            <p className="text-gray-400">No History Found</p>
          )}
        </div>
      </div>

      {/* START BUTTON */}
      <button
        onClick={startAssistant}
        className="px-6 py-3 rounded-xl font-semibold bg-white text-black shadow-md hover:bg-gray-100 hover:shadow-lg active:scale-95 transition-all duration-200"
      >
        Start Assistant
      </button>

      {/* LOGOUT */}
      <button
        onClick={handleLogOut}
        className="min-w-[150px] h-[60px] bg-white text-black font-semibold rounded-full absolute hidden lg:block top-[20px] right-[20px]"
      >
        Log Out
      </button>

      {/* CUSTOMIZE */}
      <button
        onClick={() => navigate("/customize")}
        className="min-w-[150px] h-[60px] bg-white text-black font-semibold rounded-full absolute hidden lg:block top-[100px] right-[20px]"
      >
        Customize
      </button>

      {/* ASSISTANT IMAGE */}
      <div className="w-[300px] h-[400px] flex items-center justify-center overflow-hidden rounded-4xl shadow-lg">
        <img
          src={userData?.assistantImage}
          alt="assistant"
          className="w-full h-full object-cover"
        />
      </div>

      {/* NAME */}
      <h1 className="text-white text-[18px] font-semibold">
        I'm {userData?.assistantName}
      </h1>

      {/* USER / AI GIF */}
      {!aiText ? (
        <img
          src={userImg}
          alt="user"
          className="w-[200px] h-[70px] object-contain"
        />
      ) : (
        <img
          src={aiImg}
          alt="assistant"
          className="w-[200px] h-[70px] object-contain"
        />
      )}

      {/* TEXT */}
      <h1 className="text-white text-[18px] font-semibold text-wrap">
        {userText ? userText : aiText ? aiText : ""}
      </h1>
    </div>
  );
};

export default Home;
