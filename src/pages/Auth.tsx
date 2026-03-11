import { useState } from "react";
import { useNavigate } from "react-router-dom";

type ViewMode = "login" | "signup";

type AuthForm = {
  name: string;
  email: string;
  password: string;
};

type FieldProps = {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  suffix?: React.ReactNode;
};

const Field = ({ label, type = "text", value, onChange, placeholder, suffix }: FieldProps) => (
  <div style={{ marginBottom: "16px" }}>
    <label style={{ display: "block", fontSize: "12px", fontWeight: "500", color: "#6b7280", marginBottom: "6px", letterSpacing: "0.1px" }}>{label}</label>
    <div style={{ position: "relative" }}>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        style={{ width: "100%", padding: suffix ? "11px 42px 11px 14px" : "11px 14px", borderRadius: "9px", border: "1px solid #e5e7eb", fontSize: "14px", color: "#111827", outline: "none", background: "#fafafa", boxSizing: "border-box", fontWeight: "400", transition: "border 0.15s, background 0.15s" }}
        onFocus={(event) => {
          event.target.style.borderColor = "#111827";
          event.target.style.background = "white";
        }}
        onBlur={(event) => {
          event.target.style.borderColor = "#e5e7eb";
          event.target.style.background = "#fafafa";
        }}
      />
      {suffix && <div style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)" }}>{suffix}</div>}
    </div>
  </div>
);

export default function Auth() {
  const navigate = useNavigate();
  const [view, setView] = useState<ViewMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState<AuthForm>({ name: "", email: "", password: "" });

  const setField = (key: keyof AuthForm) => (value: string) => {
    setForm((previous) => ({ ...previous, [key]: value }));
  };

  const proceed = () => {
    if (form.password.trim()) {
      navigate("/dashboard");
    }
  };

  const passwordValidation = {
    hasNumber: /\d/.test(form.password),
    minLength: form.password.length >= 8,
  };

  const EyeIcon = () => (
    <button onClick={() => setShowPassword((show) => !show)} style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: 0, display: "flex" }}>
      {showPassword ? (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
      ) : (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )}
    </button>
  );

  return (
    <div style={{ display: "flex", height: "100vh", background: "#f3f4f6", padding: "20px", boxSizing: "border-box", gap: "20px", fontFamily: "inherit" }}>
      <div
        style={{
          width: "48%",
          borderRadius: "20px",
          overflow: "hidden",
          position: "relative",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f2027 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        >
          <source src="/assets/authtruck.mp4" type="video/mp4" />
        </video>

        {/* Decorative elements */}
        <div style={{ position: "absolute", left: "26px", bottom: "96px", display: "grid", gap: "8px", zIndex: 2 }}>
          <div style={{ width: "84px", height: "6px", borderRadius: "4px", background: "rgba(147,197,253,0.45)" }} />
          <div style={{ width: "54px", height: "6px", borderRadius: "4px", background: "rgba(148,163,184,0.38)" }} />
          <div style={{ width: "110px", height: "6px", borderRadius: "4px", background: "rgba(147,197,253,0.3)" }} />
        </div>
        <div style={{ position: "absolute", right: "26px", top: "112px", display: "grid", gap: "8px", zIndex: 2 }}>
          <div style={{ width: "96px", height: "6px", borderRadius: "4px", background: "rgba(191,219,254,0.42)" }} />
          <div style={{ width: "66px", height: "6px", borderRadius: "4px", background: "rgba(148,163,184,0.35)" }} />
          <div style={{ width: "76px", height: "6px", borderRadius: "4px", background: "rgba(147,197,253,0.26)" }} />
        </div>

        {/* Keeping the soft corner radial gradients, but let me know if you want these gone too! */}
        <div style={{ position: "absolute", top: "-60px", left: "-60px", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)", zIndex: 1 }} />
        <div style={{ position: "absolute", bottom: "-40px", right: "-40px", width: "250px", height: "250px", borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,233,0.16) 0%, transparent 70%)", zIndex: 1 }} />

        <div style={{ position: "absolute", top: "24px", left: "24px", zIndex: 2, width: "180px", height: "56px", display: "flex", alignItems: "center" }}>
          <img src="/assets/Logo.png" alt="Logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>

        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 40px" }}>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "11px", fontWeight: "500", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "14px", textShadow: "0px 1px 2px rgba(0,0,0,0.5)" }}>Commercial Body Construction</p>
          <h2 style={{ color: "white", fontSize: "28px", fontWeight: "600", lineHeight: "1.35", margin: "0 0 36px", letterSpacing: "-0.5px", textShadow: "0px 2px 4px rgba(0,0,0,0.5)" }}>
            Move freight smarter,
            <br />
            <span style={{ color: "#93c5fd" }}>deliver faster.</span>
          </h2>
        </div>

        <div style={{ position: "absolute", bottom: "28px", zIndex: 2, textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", margin: 0, letterSpacing: "0.2px", textShadow: "0px 1px 2px rgba(0,0,0,0.5)" }}>Trusted by 2,400+ fleet operators worldwide</p>
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
        <div style={{ width: "100%", maxWidth: "380px" }}>
          {view === "login" ? (
            <>
              <div style={{ marginBottom: "32px" }}>
                <h1 style={{ fontSize: "24px", fontWeight: "600", color: "#111827", margin: "0 0 6px", letterSpacing: "-0.4px" }}>Welcome back</h1>
                <p style={{ fontSize: "14px", color: "#9ca3af", margin: 0, fontWeight: "400" }}>Sign in to your account</p>
              </div>

              <Field label="Email" type="email" value={form.email} onChange={setField("email")} placeholder="you@company.com" />
              <Field label="Password" type={showPassword ? "text" : "password"} value={form.password} onChange={setField("password")} placeholder="••••••••" suffix={<EyeIcon />} />

              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "-8px", marginBottom: "22px" }}>
                <span style={{ fontSize: "13px", color: "#6b7280", cursor: "pointer", fontWeight: "500" }}>Forgot password?</span>
              </div>

              <button
                onClick={proceed}
                disabled={!form.password.trim()}
                style={{ width: "100%", padding: "12px", borderRadius: "9px", background: "#111827", color: "white", border: "none", fontSize: "14px", fontWeight: "500", cursor: form.password.trim() ? "pointer" : "not-allowed", letterSpacing: "0.1px", marginBottom: "20px", transition: "opacity 0.15s", opacity: form.password.trim() ? 1 : 0.5 }}
              >
                Sign in
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <div style={{ flex: 1, height: "1px", background: "#e5e7eb" }} />
                <span style={{ fontSize: "12px", color: "#d1d5db" }}>or</span>
                <div style={{ flex: 1, height: "1px", background: "#e5e7eb" }} />
              </div>

              <p style={{ textAlign: "center", fontSize: "13px", color: "#9ca3af", margin: 0 }}>
                Don&apos;t have an account?{" "}
                <span onClick={() => setView("signup")} style={{ color: "#111827", fontWeight: "600", cursor: "pointer" }}>
                  Sign up
                </span>
              </p>
            </>
          ) : (
            <>
              <div style={{ marginBottom: "28px" }}>
                <h1 style={{ fontSize: "24px", fontWeight: "600", color: "#111827", margin: "0 0 6px", letterSpacing: "-0.4px" }}>Create account</h1>
                <p style={{ fontSize: "14px", color: "#9ca3af", margin: 0, fontWeight: "400" }}>Start managing your fleet today</p>
              </div>

              <Field label="Full name" value={form.name} onChange={setField("name")} placeholder="Jane Smith" />
              <Field label="Email" type="email" value={form.email} onChange={setField("email")} placeholder="you@company.com" />
              <Field label="Password" type={showPassword ? "text" : "password"} value={form.password} onChange={setField("password")} placeholder="Min. 8 characters" suffix={<EyeIcon />} />

              {form.password.length > 0 && (
                <div style={{ marginBottom: "16px", marginTop: "-8px" }}>
                  {[
                    { label: "One number", valid: passwordValidation.hasNumber },
                    { label: "8+ characters", valid: passwordValidation.minLength },
                  ].map((rule) => (
                    <div key={rule.label} style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "4px" }}>
                      <div style={{ width: "14px", height: "14px", borderRadius: "50%", background: rule.valid ? "#111827" : "#e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.2s" }}>
                        {rule.valid && (
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      <span style={{ fontSize: "12px", color: rule.valid ? "#374151" : "#9ca3af" }}>{rule.label}</span>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ display: "flex", alignItems: "flex-start", gap: "9px", marginBottom: "20px" }}>
                <div onClick={() => setAgreed((value) => !value)} style={{ width: "15px", height: "15px", borderRadius: "4px", border: `1.5px solid ${agreed ? "#111827" : "#d1d5db"}`, background: agreed ? "#111827" : "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px", transition: "all 0.15s" }}>
                  {agreed && (
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                <span style={{ fontSize: "13px", color: "#6b7280", lineHeight: "1.4" }}>
                  I agree to the <span style={{ color: "#111827", fontWeight: "500", cursor: "pointer", textDecoration: "underline", textDecorationColor: "#d1d5db" }}>Terms of Service</span> and <span style={{ color: "#111827", fontWeight: "500", cursor: "pointer", textDecoration: "underline", textDecorationColor: "#d1d5db" }}>Privacy Policy</span>
                </span>
              </div>

              <button
                onClick={proceed}
                disabled={!form.password.trim()}
                style={{ width: "100%", padding: "12px", borderRadius: "9px", background: "#111827", color: "white", border: "none", fontSize: "14px", fontWeight: "500", cursor: form.password.trim() ? "pointer" : "not-allowed", letterSpacing: "0.1px", marginBottom: "20px", transition: "opacity 0.15s", opacity: form.password.trim() ? 1 : 0.5 }}
              >
                Create account
              </button>

              <p style={{ textAlign: "center", fontSize: "13px", color: "#9ca3af", margin: 0 }}>
                Already have an account?{" "}
                <span onClick={() => setView("login")} style={{ color: "#111827", fontWeight: "600", cursor: "pointer" }}>
                  Sign in
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}