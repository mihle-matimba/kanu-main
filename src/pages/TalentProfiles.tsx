import { useEffect, useRef, useState } from "react";

const ACCENT = "#0f766e";

type Experience = {
  company: string;
  role: string;
  period: string;
  duration: string;
};

type Compensation = {
  basicSalary: string;
  total_ctc: string;
  grade: string;
  band: string;
};

type Employee = {
  id: number;
  name: string;
  initials: string;
  title: string;
  department: string;
  grade: string;
  location: string;
  status: string;
  employeeId: string;
  reportingTo: string;
  startDate: string;
  qualifications: string;
  skills: string[];
  responsibilities: string[];
  experience: Experience[];
  compensation: Compensation;
  avatar_color?: string;
};

type EmployeeForm = {
  name: string;
  title: string;
  department: string;
  grade: string;
  location: string;
  avatar_color: string;
  status: string;
  employeeId: string;
  reportingTo: string;
  startDate: string;
  qualifications: string;
  skills: string;
  responsibilities: string;
  compensation: Compensation;
  experience: Experience[];
};

type EditableEmployee = Omit<Employee, "skills" | "responsibilities"> & {
  skills: string;
  responsibilities: string;
};

const initEmployees: Employee[] = [
  {
    id: 1,
    name: "Mpumelelo Maswanganye",
    initials: "MM",
    title: "Senior Software Engineer",
    department: "Technology",
    grade: "G7",
    location: "Johannesburg, ZA",
    status: "Active",
    employeeId: "EMP-00421",
    reportingTo: "Kurt Von Schaeffer",
    startDate: "March 2017",
    qualifications: "BSc Computer Science, UCT",
    skills: ["React", "Node.js", "PostgreSQL", "System Design", "AWS"],
    responsibilities: [
      "Lead architecture design for core platform services",
      "Mentor junior and mid-level engineers",
      "Drive technical roadmap for compensation engine",
      "Collaborate with product on feature delivery",
      "Code review and quality assurance oversight",
    ],
    experience: [
      {
        company: "CompIQ",
        role: "Senior Software Engineer",
        period: "Mar 2017 – Present",
        duration: "8 yrs",
      },
      {
        company: "Takealot Group",
        role: "Software Engineer",
        period: "Jan 2015 – Feb 2017",
        duration: "2 yrs",
      },
      {
        company: "Isoflow",
        role: "Junior Developer",
        period: "Jun 2013 – Dec 2014",
        duration: "1.5 yrs",
      },
    ],
    compensation: {
      basicSalary: "R 38 500/mo",
      total_ctc: "R 500 000 p/a",
      grade: "G7 – Senior",
      band: "Professional",
    },
  },
  {
    id: 2,
    name: "Kurt Von Schaeffer",
    initials: "KV",
    title: "Head of Engineering",
    department: "Technology",
    grade: "G9",
    location: "Johannesburg, ZA",
    status: "Active",
    employeeId: "EMP-00089",
    reportingTo: "CEO",
    startDate: "January 2014",
    qualifications: "MEng Software Engineering, Wits",
    skills: [
      "Engineering Leadership",
      "Strategy",
      "Agile",
      "Cloud Architecture",
      "Stakeholder Management",
    ],
    responsibilities: [
      "Oversee all engineering squads and delivery",
      "Define technology strategy and standards",
      "Manage engineering budget and headcount",
      "Partner with C-suite on product direction",
      "Drive hiring and talent development",
    ],
    experience: [
      {
        company: "CompIQ",
        role: "Head of Engineering",
        period: "Jan 2014 – Present",
        duration: "11 yrs",
      },
      {
        company: "Derivco",
        role: "Engineering Manager",
        period: "Mar 2011 – Dec 2013",
        duration: "3 yrs",
      },
      {
        company: "BCX",
        role: "Senior Engineer",
        period: "Jul 2007 – Feb 2011",
        duration: "3.5 yrs",
      },
    ],
    compensation: {
      basicSalary: "R 72 000/mo",
      total_ctc: "R 950 000 p/a",
      grade: "G9 – Executive",
      band: "Leadership",
    },
  },
  {
    id: 3,
    name: "Tsie Masilo",
    initials: "TS",
    title: "HR Business Partner",
    department: "Human Resources",
    grade: "G6",
    location: "Cape Town, ZA",
    status: "Active",
    employeeId: "EMP-00312",
    reportingTo: "Mihle Matimba",
    startDate: "August 2019",
    qualifications: "BCom Industrial Psychology, Stellenbosch",
    skills: ["Talent Management", "HRIS", "Labour Law", "OD", "Compensation"],
    responsibilities: [
      "Partner with business units on people strategy",
      "Manage performance review cycles",
      "Lead talent acquisition for mid-senior roles",
      "Drive culture and engagement initiatives",
      "Compensation benchmarking and review",
    ],
    experience: [
      {
        company: "CompIQ",
        role: "HR Business Partner",
        period: "Aug 2019 – Present",
        duration: "5 yrs",
      },
      {
        company: "Old Mutual",
        role: "HR Generalist",
        period: "Feb 2017 – Jul 2019",
        duration: "2.5 yrs",
      },
      {
        company: "Woolworths SA",
        role: "HR Coordinator",
        period: "Jan 2016 – Jan 2017",
        duration: "1 yr",
      },
    ],
    compensation: {
      basicSalary: "R 29 000/mo",
      total_ctc: "R 380 000 p/a",
      grade: "G6 – Specialist",
      band: "Professional",
    },
  },
  {
    id: 4,
    name: "Mihle Matimba",
    initials: "MM",
    title: "Chief People Officer",
    department: "Human Resources",
    grade: "G10",
    location: "Johannesburg, ZA",
    status: "Active",
    employeeId: "EMP-00012",
    reportingTo: "CEO",
    startDate: "June 2010",
    qualifications: "MBA, Gordon Institute of Business Science",
    skills: ["Executive Leadership", "OD", "DEI", "Total Rewards", "Board Advisory"],
    responsibilities: [
      "Lead organisational people strategy",
      "Drive DEI and culture transformation",
      "Oversee total rewards and compensation policy",
      "Board-level people reporting",
      "Executive leadership coaching",
    ],
    experience: [
      {
        company: "CompIQ",
        role: "Chief People Officer",
        period: "Jun 2010 – Present",
        duration: "15 yrs",
      },
      {
        company: "Standard Bank",
        role: "HR Director",
        period: "Apr 2005 – May 2010",
        duration: "5 yrs",
      },
      {
        company: "Deloitte SA",
        role: "Senior HR Consultant",
        period: "Jan 2001 – Mar 2005",
        duration: "4 yrs",
      },
    ],
    compensation: {
      basicSalary: "R 95 000/mo",
      total_ctc: "R 1 250 000 p/a",
      grade: "G10 – C-Suite",
      band: "Executive",
    },
  },
  {
    id: 5,
    name: "Lonwabo Damane",
    initials: "LD",
    title: "Compensation Analyst",
    department: "Human Resources",
    grade: "G4",
    location: "Pretoria, ZA",
    status: "Active",
    employeeId: "EMP-00567",
    reportingTo: "Tsie Masilo",
    startDate: "February 2022",
    qualifications: "BCom Statistics, University of Pretoria",
    skills: ["Excel", "Compensation Benchmarking", "Data Analysis", "Remuneration", "Reporting"],
    responsibilities: [
      "Conduct salary benchmarking and market analysis",
      "Maintain compensation structures and pay scales",
      "Support annual remuneration review cycles",
      "Prepare compensation reports and dashboards",
      "Administer job grading and evaluation",
    ],
    experience: [
      {
        company: "CompIQ",
        role: "Compensation Analyst",
        period: "Feb 2022 – Present",
        duration: "3 yrs",
      },
      {
        company: "PwC SA",
        role: "Reward Analyst Intern",
        period: "Jan 2021 – Jan 2022",
        duration: "1 yr",
      },
    ],
    compensation: {
      basicSalary: "R 18 500/mo",
      total_ctc: "R 240 000 p/a",
      grade: "G4 – Analyst",
      band: "Support",
    },
  },
  {
    id: 6,
    name: "Mihlali Damane",
    initials: "MD",
    title: "Product Manager",
    department: "Product",
    grade: "G7",
    location: "Johannesburg, ZA",
    status: "Active",
    employeeId: "EMP-00398",
    reportingTo: "CEO",
    startDate: "November 2018",
    qualifications: "BCom Information Systems, UKZN",
    skills: ["Product Strategy", "Agile/Scrum", "User Research", "Data Analytics", "Roadmapping"],
    responsibilities: [
      "Own product roadmap and prioritisation",
      "Translate business needs into product requirements",
      "Lead cross-functional squad delivery",
      "Define and track OKRs and product KPIs",
      "Manage stakeholder expectations and delivery",
    ],
    experience: [
      {
        company: "CompIQ",
        role: "Product Manager",
        period: "Nov 2018 – Present",
        duration: "6 yrs",
      },
      {
        company: "Yoco Technologies",
        role: "Associate PM",
        period: "Mar 2016 – Oct 2018",
        duration: "2.5 yrs",
      },
      {
        company: "FNB",
        role: "Business Analyst",
        period: "Jan 2014 – Feb 2016",
        duration: "2 yrs",
      },
    ],
    compensation: {
      basicSalary: "R 42 000/mo",
      total_ctc: "R 550 000 p/a",
      grade: "G7 – Senior",
      band: "Professional",
    },
  },
];

const AVATAR_COLORS = ["#0f766e", "#1d4ed8", "#7c3aed", "#be185d", "#ea580c", "#0891b2", "#15803d", "#b45309"];
const DEPARTMENTS = ["All", "Technology", "Human Resources", "Product", "Finance"];

const emptyComp: Compensation = { basicSalary: "", total_ctc: "", grade: "", band: "" };
const emptyForm: EmployeeForm = {
  name: "",
  title: "",
  department: "Technology",
  grade: "",
  location: "",
  avatar_color: "#0f766e",
  status: "Active",
  employeeId: "",
  reportingTo: "",
  startDate: "",
  qualifications: "",
  skills: "",
  responsibilities: "",
  compensation: { ...emptyComp },
  experience: [{ company: "", role: "", period: "", duration: "" }],
};

type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const FieldInput = ({ label, value, onChange, placeholder }: FieldProps) => (
  <div style={{ marginBottom: "14px" }}>
    <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "5px" }}>{label}</label>
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px", color: "#0f172a", outline: "none", background: "#f8fafc", boxSizing: "border-box" }}
      onFocus={(event) => {
        event.target.style.borderColor = ACCENT;
      }}
      onBlur={(event) => {
        event.target.style.borderColor = "#e2e8f0";
      }}
    />
  </div>
);

type SelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
};

const SelectField = ({ label, value, onChange, options }: SelectProps) => (
  <div style={{ marginBottom: "14px" }}>
    <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "5px" }}>{label}</label>
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px", color: "#0f172a", outline: "none", background: "#f8fafc", boxSizing: "border-box" }}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

type TextareaProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
};

const TextareaField = ({ label, value, onChange, placeholder, rows = 3 }: TextareaProps) => (
  <div style={{ marginBottom: "14px" }}>
    <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "5px" }}>{label}</label>
    <textarea
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      rows={rows}
      style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px", color: "#0f172a", outline: "none", background: "#f8fafc", boxSizing: "border-box", resize: "vertical" }}
      onFocus={(event) => {
        event.target.style.borderColor = ACCENT;
      }}
      onBlur={(event) => {
        event.target.style.borderColor = "#e2e8f0";
      }}
    />
  </div>
);

const SectionLabel = ({ children }: { children: string }) => (
  <div style={{ fontSize: "11px", fontWeight: "800", color: ACCENT, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "14px", marginTop: "6px", display: "flex", alignItems: "center", gap: "8px" }}>
    <div style={{ height: "1px", width: "16px", background: ACCENT }} />
    {children}
    <div style={{ height: "1px", flex: 1, background: "#e2e8f0" }} />
  </div>
);

export default function TalentProfiles() {
  const [employees, setEmployees] = useState<Employee[]>(initEmployees);
  const [selected, setSelected] = useState<Employee | null>(null);
  const [activeDept, setActiveDept] = useState("All");
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState<EditableEmployee | null>(null);
  const [form, setForm] = useState<EmployeeForm>(emptyForm);
  const [filterOpen, setFilterOpen] = useState(false);
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const filterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = employees.filter((employee) => {
    const departmentMatches = activeDept === "All" || employee.department === activeDept;
    const lowerSearch = search.toLowerCase();
    const searchMatches =
      employee.name.toLowerCase().includes(lowerSearch) ||
      employee.title.toLowerCase().includes(lowerSearch);
    return departmentMatches && searchMatches;
  });

  const openProfile = (employee: Employee) => {
    setSelected(employee);
    setEditMode(false);
    setEditForm(null);
  };

  const closeDrawer = () => {
    setSelected(null);
    setEditMode(false);
    setEditForm(null);
  };

  const startEdit = () => {
    if (!selected) return;
    setEditForm({
      ...selected,
      skills: selected.skills.join(", "),
      responsibilities: selected.responsibilities.join("\n"),
      experience: selected.experience.map((exp) => ({ ...exp })),
      compensation: { ...selected.compensation },
    });
    setEditMode(true);
  };

  const saveEdit = () => {
    if (!selected || !editForm) return;

    const updated: Employee = {
      ...selected,
      ...editForm,
      skills: editForm.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
      responsibilities: editForm.responsibilities
        .split("\n")
        .map((responsibility) => responsibility.trim())
        .filter(Boolean),
      initials: editForm.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
    };

    setEmployees((previous) => previous.map((employee) => (employee.id === updated.id ? updated : employee)));
    setSelected(updated);
    setEditMode(false);
    setEditForm(null);
  };

  const handleAdd = () => {
    const newEmployee: Employee = {
      ...form,
      id: Date.now(),
      initials: form.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
      skills: form.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
      responsibilities: form.responsibilities
        .split("\n")
        .map((responsibility) => responsibility.trim())
        .filter(Boolean),
      experience: form.experience.filter((exp) => exp.company),
    };

    setEmployees((previous) => [...previous, newEmployee]);
    setShowAdd(false);
    setForm(emptyForm);
  };

  const updateFormExperience = (index: number, field: keyof Experience, value: string) => {
    setForm((state) => {
      const rows = [...state.experience];
      rows[index] = { ...rows[index], [field]: value };
      return { ...state, experience: rows };
    });
  };

  const updateEditExperience = (index: number, field: keyof Experience, value: string) => {
    setEditForm((state) => {
      if (!state) return state;
      const rows = [...state.experience];
      rows[index] = { ...rows[index], [field]: value };
      return { ...state, experience: rows };
    });
  };

  return (
    <div style={{ position: "relative", minHeight: "calc(100vh - 120px)", background: "#f1f5f9", borderRadius: "14px", overflow: "hidden" }}>
      <div style={{ background: "white", borderBottom: "1px solid #e2e8f0", padding: "10px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: "15px", fontWeight: "800", color: "#0f172a", letterSpacing: "-0.3px" }}>Profiles</span>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "#f8fafc", borderRadius: "10px", padding: "8px 14px", border: "1px solid #e2e8f0" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search employees…"
              style={{ border: "none", background: "transparent", outline: "none", fontSize: "13px", color: "#0f172a", width: "150px" }}
            />
          </div>

          <div ref={filterRef} style={{ position: "relative" }}>
            <button
              onClick={() => setFilterOpen((open) => !open)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "7px",
                background: activeDept !== "All" ? "#f0fdf4" : "white",
                color: activeDept !== "All" ? ACCENT : "#374151",
                border: activeDept !== "All" ? "1px solid #bbf7d0" : "1px solid #e2e8f0",
                borderRadius: "10px",
                padding: "9px 14px",
                fontSize: "13px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="8" y1="12" x2="16" y2="12" />
                <line x1="11" y1="18" x2="13" y2="18" />
              </svg>
              {activeDept === "All" ? "Filter" : activeDept}
              {activeDept !== "All" && (
                <span
                  onClick={(event) => {
                    event.stopPropagation();
                    setActiveDept("All");
                  }}
                  style={{ marginLeft: "2px", opacity: 0.6, fontWeight: "700", fontSize: "14px", lineHeight: 1 }}
                >
                  ×
                </span>
              )}
            </button>
            {filterOpen && (
              <div style={{ position: "absolute", top: "calc(100% + 6px)", right: 0, background: "white", border: "1px solid #e2e8f0", borderRadius: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)", zIndex: 30, minWidth: "180px", overflow: "hidden", padding: "6px" }}>
                {DEPARTMENTS.map((department) => (
                  <div
                    key={department}
                    onClick={() => {
                      setActiveDept(department);
                      setFilterOpen(false);
                    }}
                    style={{
                      padding: "9px 13px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "13px",
                      fontWeight: activeDept === department ? "700" : "400",
                      color: activeDept === department ? ACCENT : "#374151",
                      background: activeDept === department ? "#f0fdf4" : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    {department}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: "flex", background: "#f1f5f9", borderRadius: "10px", padding: "3px", border: "1px solid #e2e8f0", gap: "2px", height: "40px", boxSizing: "border-box", alignItems: "center" }}>
            <button onClick={() => setLayout("grid")} title="Grid view" style={{ width: "34px", height: "34px", borderRadius: "7px", border: "none", background: layout === "grid" ? "white" : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: layout === "grid" ? "0 1px 4px rgba(0,0,0,0.08)" : "none", transition: "all 0.15s" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={layout === "grid" ? ACCENT : "#94a3b8"} strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </button>
            <button onClick={() => setLayout("list")} title="List view" style={{ width: "34px", height: "34px", borderRadius: "7px", border: "none", background: layout === "list" ? "white" : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: layout === "list" ? "0 1px 4px rgba(0,0,0,0.08)" : "none", transition: "all 0.15s" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={layout === "list" ? ACCENT : "#94a3b8"} strokeWidth="2">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <circle cx="3" cy="6" r="1.5" fill={layout === "list" ? ACCENT : "#94a3b8"} />
                <circle cx="3" cy="12" r="1.5" fill={layout === "list" ? ACCENT : "#94a3b8"} />
                <circle cx="3" cy="18" r="1.5" fill={layout === "list" ? ACCENT : "#94a3b8"} />
              </svg>
            </button>
          </div>

          <button onClick={() => setShowAdd(true)} title="Add employee" style={{ display: "flex", alignItems: "center", gap: "5px", background: ACCENT, color: "white", border: "none", borderRadius: "10px", padding: "0 14px", height: "40px", fontSize: "13px", fontWeight: "700", cursor: "pointer", boxShadow: "0 2px 8px rgba(15,118,110,0.25)", whiteSpace: "nowrap" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add
          </button>
        </div>
      </div>

      <div style={{ background: "white", borderBottom: "1px solid #e2e8f0", padding: "8px 20px", display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ fontSize: "12.5px", color: "#94a3b8" }}>
          Showing <strong style={{ color: "#0f172a" }}>{filtered.length}</strong> {filtered.length === 1 ? "employee" : "employees"}
          {activeDept !== "All" && (
            <span>
              {" "}
              in <strong style={{ color: ACCENT }}>{activeDept}</strong>
            </span>
          )}
        </span>
      </div>

      <div style={{ padding: "20px" }}>
        {layout === "grid" ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "12px" }}>
            {filtered.map((employee) => (
              <div
                key={employee.id}
                onClick={() => openProfile(employee)}
                style={{ background: "white", borderRadius: "14px", cursor: "pointer", border: "1px solid #e8edf3", padding: "20px", transition: "all 0.18s", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.boxShadow = "0 8px 24px rgba(15,118,110,0.11)";
                  event.currentTarget.style.borderColor = "#b2f5e8";
                  event.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)";
                  event.currentTarget.style.borderColor = "#e8edf3";
                  event.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "13px", marginBottom: "14px" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "12px", flexShrink: 0, background: "#f1f5f9", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: "#94a3b8", fontWeight: "800", fontSize: "15px" }}>{employee.initials}</span>
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: "800", fontSize: "14.5px", color: "#0f172a", letterSpacing: "-0.3px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{employee.name}</div>
                    <div style={{ color: "#64748b", fontSize: "12px", marginTop: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{employee.title}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ background: "#f8fafc", color: "#475569", fontSize: "11px", fontWeight: "700", padding: "3px 10px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>{employee.grade}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", color: ACCENT, fontSize: "12px", fontWeight: "700" }}>
                    View Profile
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "white", borderRadius: "14px", border: "1px solid #e8edf3", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr 80px 110px", alignItems: "center", padding: "10px 20px", background: "#f8fafc", borderBottom: "1px solid #e8edf3" }}>
              {["Employee", "Role", "Grade", ""].map((header, index) => (
                <div key={`${header}-${index}`} style={{ fontSize: "10.5px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.6px", textAlign: index === 3 ? "right" : "left" }}>{header}</div>
              ))}
            </div>
            {filtered.map((employee, index) => (
              <div
                key={employee.id}
                onClick={() => openProfile(employee)}
                style={{ display: "grid", gridTemplateColumns: "2fr 2fr 80px 110px", alignItems: "center", padding: "13px 20px", cursor: "pointer", background: "white", borderBottom: index < filtered.length - 1 ? "1px solid #f1f5f9" : "none", transition: "background 0.12s" }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.background = "#f8fffe";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.background = "white";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "9px", flexShrink: 0, background: "#f1f5f9", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: "#94a3b8", fontWeight: "800", fontSize: "12px" }}>{employee.initials}</span>
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: "700", fontSize: "13.5px", color: "#0f172a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{employee.name}</div>
                    <div style={{ fontSize: "11.5px", color: "#94a3b8", marginTop: "1px" }}>{employee.department}</div>
                  </div>
                </div>
                <div style={{ fontSize: "13px", color: "#374151", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", paddingRight: "12px" }}>{employee.title}</div>
                <div>
                  <span style={{ background: "#f8fafc", color: "#475569", fontSize: "11px", fontWeight: "700", padding: "3px 10px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>{employee.grade}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "4px", color: ACCENT, fontSize: "12px", fontWeight: "700" }}>
                  View Profile
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <>
          <div onClick={closeDrawer} style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.4)", backdropFilter: "blur(3px)", zIndex: 40 }} />
          <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "500px", background: "white", zIndex: 50, overflowY: "auto", boxShadow: "-24px 0 60px rgba(0,0,0,0.13)", display: "flex", flexDirection: "column" }}>
            <div style={{ background: `linear-gradient(135deg, ${selected.avatar_color || ACCENT}, ${(selected.avatar_color || ACCENT) + "bb"})`, padding: "28px 28px 24px", flexShrink: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                  <div style={{ width: "58px", height: "58px", borderRadius: "15px", background: "rgba(255,255,255,0.2)", border: "2px solid rgba(255,255,255,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: "white", fontWeight: "800", fontSize: "20px" }}>{selected.initials}</span>
                  </div>
                  <div>
                    <h2 style={{ color: "white", fontWeight: "800", fontSize: "19px", margin: 0, letterSpacing: "-0.4px" }}>{selected.name}</h2>
                    <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "13px", margin: "4px 0 0" }}>{selected.title}</p>
                    <div style={{ display: "flex", gap: "7px", marginTop: "10px" }}>
                      {[selected.grade, selected.department].map((tag) => (
                        <span key={tag} style={{ background: "rgba(255,255,255,0.2)", color: "white", fontSize: "11px", fontWeight: "700", padding: "3px 10px", borderRadius: "20px" }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  {!editMode && (
                    <button onClick={startEdit} style={{ background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.28)", borderRadius: "8px", padding: "7px 13px", color: "white", fontSize: "12px", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}>
                      Edit Details
                    </button>
                  )}
                  <button onClick={closeDrawer} style={{ background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.28)", borderRadius: "8px", width: "34px", height: "34px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white", fontSize: "16px" }}>
                    ✕
                  </button>
                </div>
              </div>
            </div>

            <div style={{ padding: "24px 28px", flex: 1 }}>
              {editMode && editForm ? (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <h3 style={{ margin: 0, fontSize: "15px", fontWeight: "800", color: "#0f172a" }}>Edit Profile</h3>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button onClick={() => { setEditMode(false); setEditForm(null); }} style={{ padding: "8px 14px", borderRadius: "8px", border: "1px solid #e2e8f0", background: "white", fontSize: "12px", fontWeight: "700", cursor: "pointer", color: "#64748b" }}>Cancel</button>
                      <button onClick={saveEdit} style={{ padding: "8px 16px", borderRadius: "8px", border: "none", background: ACCENT, color: "white", fontSize: "12px", fontWeight: "800", cursor: "pointer" }}>Save Changes</button>
                    </div>
                  </div>
                  <div style={{ height: "1px", background: "#f1f5f9", marginBottom: "20px" }} />

                  <SectionLabel>Personal & Job Info</SectionLabel>
                  <FieldInput label="Full Name" value={editForm.name} onChange={(value) => setEditForm((previous) => (previous ? { ...previous, name: value } : previous))} />
                  <FieldInput label="Job Title" value={editForm.title} onChange={(value) => setEditForm((previous) => (previous ? { ...previous, title: value } : previous))} />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <SelectField label="Department" value={editForm.department} onChange={(value) => setEditForm((previous) => (previous ? { ...previous, department: value } : previous))} options={["Technology", "Human Resources", "Product", "Finance"]} />
                    <FieldInput label="Grade" value={editForm.grade} onChange={(value) => setEditForm((previous) => (previous ? { ...previous, grade: value } : previous))} />
                    <FieldInput label="Location" value={editForm.location} onChange={(value) => setEditForm((previous) => (previous ? { ...previous, location: value } : previous))} />
                    <FieldInput label="Reports To" value={editForm.reportingTo} onChange={(value) => setEditForm((previous) => (previous ? { ...previous, reportingTo: value } : previous))} />
                  </div>
                  <FieldInput label="Start Date" value={editForm.startDate} onChange={(value) => setEditForm((previous) => (previous ? { ...previous, startDate: value } : previous))} />
                  <FieldInput label="Qualifications" value={editForm.qualifications} onChange={(value) => setEditForm((previous) => (previous ? { ...previous, qualifications: value } : previous))} />

                  <SectionLabel>Skills & Responsibilities</SectionLabel>
                  <TextareaField label="Skills (comma-separated)" value={editForm.skills} onChange={(value) => setEditForm((previous) => (previous ? { ...previous, skills: value } : previous))} rows={2} />
                  <TextareaField label="Responsibilities (one per line)" value={editForm.responsibilities} onChange={(value) => setEditForm((previous) => (previous ? { ...previous, responsibilities: value } : previous))} rows={5} />

                  <SectionLabel>Career Experience</SectionLabel>
                  {editForm.experience.map((row, index) => (
                    <div key={`${row.company}-${index}`} style={{ background: "#f8fafc", borderRadius: "10px", padding: "12px", border: "1px solid #e2e8f0", marginBottom: "8px" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                        <FieldInput label="Company" value={row.company} onChange={(value) => updateEditExperience(index, "company", value)} />
                        <FieldInput label="Role" value={row.role} onChange={(value) => updateEditExperience(index, "role", value)} />
                        <FieldInput label="Period" value={row.period} onChange={(value) => updateEditExperience(index, "period", value)} />
                        <FieldInput label="Duration" value={row.duration} onChange={(value) => updateEditExperience(index, "duration", value)} />
                      </div>
                    </div>
                  ))}
                  <button onClick={() => setEditForm((previous) => (previous ? { ...previous, experience: [...previous.experience, { company: "", role: "", period: "", duration: "" }] } : previous))} style={{ fontSize: "12px", color: ACCENT, background: "none", border: `1px dashed ${ACCENT}`, borderRadius: "8px", padding: "7px 14px", cursor: "pointer", fontWeight: "700", marginBottom: "16px" }}>
                    + Add Role
                  </button>

                  <SectionLabel>Compensation</SectionLabel>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <FieldInput label="Basic Salary" value={editForm.compensation?.basicSalary || ""} onChange={(value) => setEditForm((previous) => (previous ? { ...previous, compensation: { ...previous.compensation, basicSalary: value } } : previous))} />
                    <FieldInput label="Total CTC" value={editForm.compensation?.total_ctc || ""} onChange={(value) => setEditForm((previous) => (previous ? { ...previous, compensation: { ...previous.compensation, total_ctc: value } } : previous))} />
                    <FieldInput label="Grade Label" value={editForm.compensation?.grade || ""} onChange={(value) => setEditForm((previous) => (previous ? { ...previous, compensation: { ...previous.compensation, grade: value } } : previous))} />
                    <FieldInput label="Band" value={editForm.compensation?.band || ""} onChange={(value) => setEditForm((previous) => (previous ? { ...previous, compensation: { ...previous.compensation, band: value } } : previous))} />
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", background: "#f8fafc", borderRadius: "12px", padding: "16px", border: "1px solid #e2e8f0", marginBottom: "24px" }}>
                    {[
                      { label: "Employee ID", value: selected.employeeId },
                      { label: "Start Date", value: selected.startDate },
                      { label: "Reports To", value: selected.reportingTo },
                      { label: "Location", value: selected.location },
                    ].map((item) => (
                      <div key={item.label}>
                        <div style={{ fontSize: "10px", color: "#94a3b8", marginBottom: "3px", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: "700" }}>{item.label}</div>
                        <div style={{ fontSize: "13px", fontWeight: "700", color: "#0f172a" }}>{item.value}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginBottom: "24px" }}>
                    <h3 style={{ fontSize: "11px", fontWeight: "800", color: "#0f172a", margin: "0 0 14px", textTransform: "uppercase", letterSpacing: "0.7px" }}>Career Experience</h3>
                    <div style={{ position: "relative", paddingLeft: "20px" }}>
                      <div style={{ position: "absolute", left: "7px", top: "8px", bottom: "8px", width: "2px", background: `linear-gradient(to bottom,${selected.avatar_color || ACCENT},#e2e8f0)`, borderRadius: "2px" }} />
                      {selected.experience?.map((exp, index) => (
                        <div key={`${exp.company}-${index}`} style={{ position: "relative", marginBottom: "12px", paddingLeft: "16px" }}>
                          <div style={{ position: "absolute", left: "-13px", top: "8px", width: "12px", height: "12px", borderRadius: "50%", background: index === 0 ? selected.avatar_color || ACCENT : "white", border: `2px solid ${index === 0 ? selected.avatar_color || ACCENT : "#cbd5e1"}`, boxShadow: "0 0 0 2px white" }} />
                          <div style={{ background: index === 0 ? `${selected.avatar_color || ACCENT}08` : "#f8fafc", border: `1px solid ${index === 0 ? `${selected.avatar_color || ACCENT}25` : "#e8edf3"}`, borderRadius: "10px", padding: "12px 14px" }}>
                            <div style={{ fontWeight: "800", fontSize: "13px", color: "#0f172a" }}>{exp.role}</div>
                            <div style={{ fontSize: "12.5px", color: "#64748b", fontWeight: "600", marginTop: "2px" }}>{exp.company}</div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "7px" }}>
                              <span style={{ fontSize: "11.5px", color: "#94a3b8" }}>{exp.period}</span>
                              <span style={{ fontSize: "11px", fontWeight: "800", color: index === 0 ? selected.avatar_color || ACCENT : "#94a3b8", background: index === 0 ? `${selected.avatar_color || ACCENT}15` : "#f1f5f9", padding: "2px 9px", borderRadius: "6px" }}>{exp.duration}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: "24px" }}>
                    <h3 style={{ fontSize: "11px", fontWeight: "800", color: "#0f172a", margin: "0 0 12px", textTransform: "uppercase", letterSpacing: "0.7px" }}>Key Responsibilities</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {selected.responsibilities.map((responsibility, index) => (
                        <div key={`${responsibility}-${index}`} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                          <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: selected.avatar_color || ACCENT, marginTop: "7px", flexShrink: 0 }} />
                          <span style={{ fontSize: "13px", color: "#374151", lineHeight: "1.55" }}>{responsibility}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: "24px" }}>
                    <h3 style={{ fontSize: "11px", fontWeight: "800", color: "#0f172a", margin: "0 0 12px", textTransform: "uppercase", letterSpacing: "0.7px" }}>Skills & Expertise</h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                      {selected.skills.map((skill) => (
                        <span key={skill} style={{ background: `${selected.avatar_color || ACCENT}12`, color: selected.avatar_color || ACCENT, border: `1px solid ${selected.avatar_color || ACCENT}28`, fontSize: "12px", fontWeight: "700", padding: "5px 12px", borderRadius: "8px" }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: "24px" }}>
                    <h3 style={{ fontSize: "11px", fontWeight: "800", color: "#0f172a", margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.7px" }}>Qualifications</h3>
                    <div style={{ background: "#f8fafc", borderRadius: "10px", padding: "12px 14px", border: "1px solid #e2e8f0", fontSize: "13px", color: "#374151", fontWeight: "600" }}>🎓 {selected.qualifications}</div>
                  </div>

                  <div style={{ marginBottom: "16px" }}>
                    <h3 style={{ fontSize: "11px", fontWeight: "800", color: "#0f172a", margin: "0 0 12px", textTransform: "uppercase", letterSpacing: "0.7px" }}>Compensation Overview</h3>
                    <div style={{ background: "linear-gradient(135deg,#f0fdf4,#f0f9ff)", border: "1px solid #bbf7d0", borderRadius: "12px", padding: "16px" }}>
                      {[
                        { label: "Basic Salary", value: selected.compensation?.basicSalary },
                        { label: "Total CTC", value: selected.compensation?.total_ctc },
                        { label: "Grade", value: selected.compensation?.grade },
                        { label: "Band", value: selected.compensation?.band },
                      ].map((item, index) => (
                        <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: index < 3 ? "1px solid #dcfce7" : "none" }}>
                          <span style={{ fontSize: "13px", color: "#64748b" }}>{item.label}</span>
                          <span style={{ fontSize: "13px", fontWeight: "800", color: "#0f172a" }}>{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {showAdd && (
        <>
          <div onClick={() => setShowAdd(false)} style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.5)", backdropFilter: "blur(4px)", zIndex: 60 }} />
          <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "640px", maxHeight: "88vh", background: "white", borderRadius: "20px", zIndex: 70, overflowY: "auto", boxShadow: "0 32px 80px rgba(0,0,0,0.2)" }}>
            <div style={{ padding: "24px 28px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "white", zIndex: 1, borderRadius: "20px 20px 0 0" }}>
              <div>
                <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "800", color: "#0f172a", letterSpacing: "-0.4px" }}>Add New Employee</h2>
                <p style={{ margin: "3px 0 0", fontSize: "13px", color: "#64748b" }}>Fill in the employee profile details below</p>
              </div>
              <button onClick={() => setShowAdd(false)} style={{ background: "#f1f5f9", border: "none", borderRadius: "10px", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "16px", color: "#64748b" }}>✕</button>
            </div>
            <div style={{ padding: "24px 28px" }}>
              <SectionLabel>Personal Information</SectionLabel>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div style={{ gridColumn: "span 2" }}>
                  <FieldInput label="Full Name *" value={form.name} onChange={(value) => setForm((previous) => ({ ...previous, name: value }))} placeholder="e.g. Mufaro Chikomo" />
                </div>
                <FieldInput label="Employee ID" value={form.employeeId} onChange={(value) => setForm((previous) => ({ ...previous, employeeId: value }))} placeholder="EMP-00XXX" />
                <FieldInput label="Location" value={form.location} onChange={(value) => setForm((previous) => ({ ...previous, location: value }))} placeholder="e.g. Johannesburg, ZA" />
              </div>

              <SectionLabel>Job Information</SectionLabel>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div style={{ gridColumn: "span 2" }}>
                  <FieldInput label="Job Title *" value={form.title} onChange={(value) => setForm((previous) => ({ ...previous, title: value }))} placeholder="e.g. Senior Software Engineer" />
                </div>
                <SelectField label="Department" value={form.department} onChange={(value) => setForm((previous) => ({ ...previous, department: value }))} options={["Technology", "Human Resources", "Product", "Finance"]} />
                <FieldInput label="Grade" value={form.grade} onChange={(value) => setForm((previous) => ({ ...previous, grade: value }))} placeholder="e.g. G7" />
                <FieldInput label="Reports To" value={form.reportingTo} onChange={(value) => setForm((previous) => ({ ...previous, reportingTo: value }))} placeholder="Manager name" />
                <FieldInput label="Start Date" value={form.startDate} onChange={(value) => setForm((previous) => ({ ...previous, startDate: value }))} placeholder="e.g. March 2024" />
              </div>
              <FieldInput label="Qualifications" value={form.qualifications} onChange={(value) => setForm((previous) => ({ ...previous, qualifications: value }))} placeholder="e.g. BSc Computer Science, UCT" />

              <SectionLabel>Career Experience</SectionLabel>
              {form.experience.map((row, index) => (
                <div key={`${row.company}-${index}`} style={{ background: "#f8fafc", borderRadius: "12px", padding: "14px", border: "1px solid #e2e8f0", marginBottom: "10px" }}>
                  <div style={{ fontSize: "11px", fontWeight: "700", color: "#94a3b8", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Role {index + 1}</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    <FieldInput label="Company" value={row.company} onChange={(value) => updateFormExperience(index, "company", value)} placeholder="Company name" />
                    <FieldInput label="Job Title" value={row.role} onChange={(value) => updateFormExperience(index, "role", value)} placeholder="Your title" />
                    <FieldInput label="Period" value={row.period} onChange={(value) => updateFormExperience(index, "period", value)} placeholder="Jan 2020 – Dec 2022" />
                    <FieldInput label="Duration" value={row.duration} onChange={(value) => updateFormExperience(index, "duration", value)} placeholder="2 yrs" />
                  </div>
                </div>
              ))}
              <button onClick={() => setForm((previous) => ({ ...previous, experience: [...previous.experience, { company: "", role: "", period: "", duration: "" }] }))} style={{ fontSize: "12px", color: ACCENT, background: "none", border: `1px dashed ${ACCENT}`, borderRadius: "9px", padding: "9px 0", cursor: "pointer", fontWeight: "700", width: "100%", marginBottom: "4px" }}>
                + Add Another Role
              </button>

              <SectionLabel>Skills & Responsibilities</SectionLabel>
              <TextareaField label="Skills (comma-separated)" value={form.skills} onChange={(value) => setForm((previous) => ({ ...previous, skills: value }))} placeholder="React, Leadership, Data Analysis…" rows={2} />
              <TextareaField label="Key Responsibilities (one per line)" value={form.responsibilities} onChange={(value) => setForm((previous) => ({ ...previous, responsibilities: value }))} placeholder={"Lead team roadmap\nConduct stakeholder reviews\n…"} rows={5} />

              <SectionLabel>Compensation</SectionLabel>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <FieldInput label="Basic Salary" value={form.compensation.basicSalary} onChange={(value) => setForm((previous) => ({ ...previous, compensation: { ...previous.compensation, basicSalary: value } }))} placeholder="R 38 500/mo" />
                <FieldInput label="Total CTC" value={form.compensation.total_ctc} onChange={(value) => setForm((previous) => ({ ...previous, compensation: { ...previous.compensation, total_ctc: value } }))} placeholder="R 500 000 p/a" />
                <FieldInput label="Grade Label" value={form.compensation.grade} onChange={(value) => setForm((previous) => ({ ...previous, compensation: { ...previous.compensation, grade: value } }))} placeholder="G7 – Senior" />
                <FieldInput label="Band" value={form.compensation.band} onChange={(value) => setForm((previous) => ({ ...previous, compensation: { ...previous.compensation, band: value } }))} placeholder="Professional" />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <div style={{ fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "10px" }}>Profile Colour</div>
                <div style={{ display: "flex", gap: "8px" }}>
                  {AVATAR_COLORS.map((color) => (
                    <div key={color} onClick={() => setForm((previous) => ({ ...previous, avatar_color: color }))} style={{ width: "26px", height: "26px", borderRadius: "7px", background: color, cursor: "pointer", border: form.avatar_color === color ? "3px solid #0f172a" : "3px solid transparent", transition: "border 0.15s" }} />
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px", paddingTop: "10px", borderTop: "1px solid #f1f5f9" }}>
                <button onClick={() => setShowAdd(false)} style={{ flex: 1, padding: "13px", borderRadius: "10px", border: "1px solid #e2e8f0", background: "white", fontSize: "14px", fontWeight: "700", cursor: "pointer", color: "#64748b" }}>Cancel</button>
                <button onClick={handleAdd} disabled={!form.name || !form.title} style={{ flex: 2, padding: "13px", borderRadius: "10px", border: "none", background: form.name && form.title ? ACCENT : "#e2e8f0", color: form.name && form.title ? "white" : "#94a3b8", fontSize: "14px", fontWeight: "800", cursor: form.name && form.title ? "pointer" : "default", boxShadow: form.name && form.title ? "0 4px 14px rgba(15,118,110,0.28)" : "none" }}>
                  Create Employee Profile
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
