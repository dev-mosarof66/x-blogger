
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";


const VerifyEmail= ({
  codeLength = 4,
  resendCooldown = 30,
}) => {
  const [values, setValues] = useState(
    Array.from({ length: codeLength }, () => "")
  );
  const { theme } = useSelector((state) => state.theme);
  const inputsRef = useRef([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [success, setSuccess] = useState(false);

  // start cooldown if resend triggered
  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = window.setInterval(() => {
        setCooldown((c) => {
          if (c <= 1) {
            window.clearInterval(timer);
            return 0;
          }
          return c - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) window.clearInterval(timer);
    };
  }, [cooldown]);

  // helper to read code
  const getCode = () => values.join("").trim();

  // auto-focus first box on mount
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  // handle single-character input
  const handleChange =
    (i) => (e) => {
      setError(null);
      const raw = e.target.value;
      // allow only digits, take last valid char
      const digit = raw.replace(/\D/g, "").slice(-1);
      setValues((prev) => {
        const next = [...prev];
        next[i] = digit;
        return next;
      });

      if (digit) {
        // move focus to next input
        const nextInput = inputsRef.current[i + 1];
        if (nextInput) nextInput.focus();
      }
    };

  // handle key events for navigation/backspace
  const handleKeyDown =
    (i) => (e) => {
      setError(null);
      const key = e.key;

      if (key === "Backspace") {
        if (values[i]) {
          // clear current
          setValues((prev) => {
            const next = [...prev];
            next[i] = "";
            return next;
          });
        } else {
          // move focus to previous
          const prevInput = inputsRef.current[i - 1];
          if (prevInput) {
            prevInput.focus();
            setValues((prev) => {
              const next = [...prev];
              next[i - 1] = "";
              return next;
            });
          }
        }
      } else if (key === "ArrowLeft") {
        inputsRef.current[Math.max(0, i - 1)]?.focus();
      } else if (key === "ArrowRight") {
        inputsRef.current[Math.min(codeLength - 1, i + 1)]?.focus();
      } else if (key === "Enter") {
        submit();
      }
    };

  // paste support (accept full code string)
  const handlePaste = (e) => {
    e.preventDefault();
    setError(null);
    const text = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!text) return;
    const chars = text.slice(0, codeLength).split("");
    setValues((prev) => {
      const next = [...prev];
      for (let i = 0; i < codeLength; i++) {
        next[i] = chars[i] ?? "";
      }
      return next;
    });
    // focus next empty or last
    const firstEmpty = Math.min(
      codeLength - 1,
      chars.length >= codeLength ? codeLength - 1 : chars.length
    );
    inputsRef.current[firstEmpty]?.focus();
  };

  // submit handler
  const submit = async () => {
    setError(null);
    const code = getCode();
    if (code.length !== codeLength) {
      toast.error(`Please enter the ${codeLength}-digit code.`);
      return;
    }
    setLoading(true);
    setSuccess(false);
  };

  // resend handler
  const handleResend = async () => {
    setError(null);
    if (cooldown > 0) return;
    setCooldown(resendCooldown);
  };

  return (
    <div
      className={`w-full min-h-screen flex items-center justify-center duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-b from-gray-900 to-black text-white"
          : "bg-white text-gray-900"
      }`}
    >
      <div
        className={`w-full max-w-md border rounded-xl shadow-sm p-6 transition ${
          theme === "dark"
            ? "bg-gray-900 border-gray-800"
            : "bg-white border-gray-200 shadow-black"
        }`}
      >
        <div className="w-full flex flex-col items-center justify-center gap-4">
          <h1
            className={`text-2xl font-semibold mb-1 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Verify your email
          </h1>
          <p
            className={`text-sm text-center mb-6 ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            We have sent a {codeLength}-digit code to your email. Please check
            your inbox.
          </p>
        </div>

        {/* OTP inputs */}
        <div className="flex items-center justify-center gap-3 mb-3">
          {values.map((val, i) => (
            <input
              key={i}
              ref={(el) => {
                inputsRef.current[i] = el;
              }}
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={val}
              onChange={handleChange(i)}
              onKeyDown={handleKeyDown(i)}
              onPaste={handlePaste}
              aria-label={`Digit ${i + 1}`}
              className={`w-12 h-12 sm:w-14 sm:h-14 text-center rounded-lg border text-xl sm:text-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-200 text-white"
                  : "bg-white border-gray-700 text-gray-900"
              }`}
            />
          ))}
        </div>

        {/* error / success */}
        {error && (
          <div className="text-sm text-red-500 mb-2" role="alert">
            {error}
          </div>
        )}
        {success && (
          <div className="text-sm text-green-500 mb-2" role="status">
            Email verified successfully!
          </div>
        )}

        {/* actions */}
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={submit}
            disabled={loading || success}
            className={`flex-1 py-2 rounded-md text-white font-medium transition disabled:opacity-60 ${
              success
                ? "bg-green-600 hover:bg-green-600 cursor-default"
                : "bg-purple-600 hover:bg-purple-700"
            } cursor-pointer transition duration-300 delay-75`}
          >
            {loading ? "Verifying..." : success ? "Verified" : "Verify"}
          </button>
        </div>

        {/* resend */}
        <div
          className={`mt-4 text-sm ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          <span>Didn&apos;t receive the code? </span>
          <button
            onClick={handleResend}
            disabled={cooldown > 0}
            className={`ml-1 font-medium underline ${
              cooldown > 0
                ? "opacity-60 cursor-not-allowed"
                : "text-purple-600 hover:text-purple-700 cursor-pointer transition duration-300 delay-75"
            }`}
          >
            {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend code"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
