import { Link } from "react-router";
import { Sidebar } from "../components/Sidebar";
import { ArrowLeft, Info, TrendingUp, Clock, User } from "lucide-react";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const priorityData = [
  {
    id: "1",
    rank: 1,
    sender: "Sarah Chen",
    subject: "Q4 Board Meeting - Strategic Review",
    score: 98,
    breakdown: {
      deadline: 45,
      sender: 28,
      urgency: 25
    },
    deadline: "Today, 3:00 PM",
    reasoning: "Critical board meeting with tight deadline. High-priority sender (Chief of Staff). Strategic importance confirmed by content analysis."
  },
  {
    id: "2",
    rank: 2,
    sender: "Mike Rodriguez",
    subject: "Investor Update: Series C Timeline",
    score: 94,
    breakdown: {
      deadline: 40,
      sender: 30,
      urgency: 24
    },
    deadline: "Tomorrow, 10:00 AM",
    reasoning: "C-level sender discussing fundraising timeline. Historical pattern indicates high engagement priority. Time-sensitive financial matter."
  },
  {
    id: "3",
    rank: 3,
    sender: "Emily Watson",
    subject: "Team Performance Reviews - Q4",
    score: 87,
    breakdown: {
      deadline: 35,
      sender: 28,
      urgency: 24
    },
    deadline: "This week",
    reasoning: "Direct report with management responsibility. 12 pending reviews indicate blocking dependency. Historical completion pattern suggests urgency."
  },
  {
    id: "4",
    rank: 4,
    sender: "David Park",
    subject: "Product Roadmap Alignment",
    score: 82,
    breakdown: {
      deadline: 30,
      sender: 27,
      urgency: 25
    },
    deadline: "Next Monday",
    reasoning: "Product leadership discussing Q1 priorities. Cross-functional coordination required. Engineering capacity planning is time-sensitive."
  },
  {
    id: "5",
    rank: 5,
    sender: "Lisa Anderson",
    subject: "Marketing Campaign Results",
    score: 76,
    breakdown: {
      deadline: 25,
      sender: 26,
      urgency: 25
    },
    deadline: "Next week",
    reasoning: "Regular reporting cadence. No blocking dependencies detected. Lower urgency based on content analysis and historical patterns."
  },
];

const chartData = priorityData.map(item => ({
  name: item.sender.split(' ')[0],
  score: item.score,
  deadline: item.breakdown.deadline,
  sender: item.breakdown.sender,
  urgency: item.breakdown.urgency,
}));

export function PriorityEngine() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState<{ [key: string]: boolean }>({});

  const toggleExplanation = (id: string) => {
    setShowExplanation(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto p-10">
          {/* Header */}
          <div className="mb-10 pb-6 border-b border-border">
            <Link 
              to="/dashboard"
              className="flex items-center gap-2 mb-6"
              style={{ 
                fontFamily: 'var(--font-sans)',
                fontSize: '16px',
                fontWeight: 500,
                lineHeight: '120%',
                color: 'var(--link)'
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to dashboard
            </Link>
            
            <h2 
              className="mb-4"
              style={{ 
                fontFamily: 'var(--font-sans)',
                fontSize: '80px',
                fontWeight: 400,
                lineHeight: '100%',
                letterSpacing: '-0.05em'
              }}
            >
              Designed for clarity.<br />Built for action.
            </h2>
            <p 
              style={{ 
                fontFamily: 'var(--font-serif)',
                fontSize: '20px',
                fontWeight: 400,
                lineHeight: '120%',
                letterSpacing: '-0.04em',
                color: 'var(--muted-foreground)'
              }}
            >
              Your priority engine analyzes deadline weight, sender importance, and AI-detected urgency to surface what matters most.
            </p>
          </div>

          {/* Score Distribution Chart */}
          <div className="bg-secondary rounded-[16px] p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 
                style={{ 
                  fontFamily: 'var(--font-sans)',
                  fontSize: '20px',
                  fontWeight: 500,
                  lineHeight: '100%',
                  letterSpacing: '-0.02em'
                }}
              >
                Priority Distribution
              </h3>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-chart-1"></div>
                  <span 
                    style={{ 
                      fontFamily: 'var(--font-mono)',
                      fontSize: '14px',
                      fontWeight: 400,
                      color: 'var(--muted-foreground)'
                    }}
                  >
                    Total Score
                  </span>
                </div>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12, fill: '#6C6C6C', fontFamily: 'var(--font-mono)' }}
                  axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#6C6C6C', fontFamily: 'var(--font-mono)' }}
                  axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #DBE0EC',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: 'var(--font-mono)'
                  }}
                />
                <Bar dataKey="score" fill="var(--chart-1)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Priority List */}
          <div className="space-y-4">
            {priorityData.map((item) => (
              <div
                key={item.id}
                className={`
                  bg-card border rounded-[16px] transition-all
                  ${selectedItem === item.id ? 'border-primary shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.12),0px_8px_8px_-4px_rgba(0,0,0,0.08)]' : 'border-border'}
                `}
              >
                <div 
                  className="p-6 cursor-pointer"
                  onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex gap-6 flex-1">
                      {/* Rank */}
                      <div className="flex-shrink-0">
                        <div 
                          className={`
                            w-12 h-12 rounded-xl flex items-center justify-center
                            ${item.rank === 1 
                              ? 'bg-red-100 text-red-700' 
                              : item.rank === 2 
                              ? 'bg-yellow-100 text-yellow-700' 
                              : 'bg-green-100 text-green-700'
                            }
                          `}
                          style={{ 
                            fontFamily: 'var(--font-mono)',
                            fontSize: '18px',
                            fontWeight: 500
                          }}
                        >
                          {item.rank}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span 
                            style={{ 
                              fontFamily: 'var(--font-sans)',
                              fontSize: '20px',
                              fontWeight: 500,
                              lineHeight: '100%',
                              letterSpacing: '-0.02em'
                            }}
                          >
                            {item.sender}
                          </span>
                        </div>
                        <h3 
                          className="mb-2"
                          style={{ 
                            fontFamily: 'var(--font-sans)',
                            fontSize: '20px',
                            fontWeight: 500,
                            lineHeight: '100%',
                            letterSpacing: '-0.02em'
                          }}
                        >
                          {item.subject}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span 
                            style={{ 
                              fontFamily: 'var(--font-mono)',
                              fontSize: '14px',
                              fontWeight: 400,
                              color: 'var(--muted-foreground)'
                            }}
                          >
                            {item.deadline}
                          </span>
                        </div>
                      </div>

                      {/* Score */}
                      <div className="text-right">
                        <div 
                          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground mb-3"
                          style={{ 
                            fontFamily: 'var(--font-mono)',
                            fontSize: '24px',
                            fontWeight: 500
                          }}
                        >
                          {item.score}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExplanation(item.id);
                          }}
                          className="flex items-center gap-1 hover:opacity-65 transition-opacity"
                          style={{ 
                            fontFamily: 'var(--font-sans)',
                            fontSize: '16px',
                            fontWeight: 500,
                            lineHeight: '120%',
                            color: 'var(--link)'
                          }}
                        >
                          <Info className="w-4 h-4" />
                          {showExplanation[item.id] ? 'Hide' : 'Explain'} ranking
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Score Breakdown */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span 
                          style={{ 
                            fontFamily: 'var(--font-mono)',
                            fontSize: '14px',
                            fontWeight: 400,
                            color: 'var(--muted-foreground)'
                          }}
                        >
                          Deadline Weight
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-red-500" 
                            style={{ width: `${(item.breakdown.deadline / 50) * 100}%` }}
                          ></div>
                        </div>
                        <span 
                          style={{ 
                            fontFamily: 'var(--font-mono)',
                            fontSize: '14px',
                            fontWeight: 500
                          }}
                        >
                          {item.breakdown.deadline}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span 
                          style={{ 
                            fontFamily: 'var(--font-mono)',
                            fontSize: '14px',
                            fontWeight: 400,
                            color: 'var(--muted-foreground)'
                          }}
                        >
                          Sender Weight
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500" 
                            style={{ width: `${(item.breakdown.sender / 50) * 100}%` }}
                          ></div>
                        </div>
                        <span 
                          style={{ 
                            fontFamily: 'var(--font-mono)',
                            fontSize: '14px',
                            fontWeight: 500
                          }}
                        >
                          {item.breakdown.sender}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-muted-foreground" />
                        <span 
                          style={{ 
                            fontFamily: 'var(--font-mono)',
                            fontSize: '14px',
                            fontWeight: 400,
                            color: 'var(--muted-foreground)'
                          }}
                        >
                          AI Urgency
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500" 
                            style={{ width: `${(item.breakdown.urgency / 50) * 100}%` }}
                          ></div>
                        </div>
                        <span 
                          style={{ 
                            fontFamily: 'var(--font-mono)',
                            fontSize: '14px',
                            fontWeight: 500
                          }}
                        >
                          {item.breakdown.urgency}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Explanation Panel */}
                {showExplanation[item.id] && (
                  <div className="px-6 pb-6">
                    <div className="bg-secondary rounded-[16px] p-6">
                      <div className="mb-4">
                        <h4 
                          className="mb-2"
                          style={{ 
                            fontFamily: 'var(--font-sans)',
                            fontSize: '20px',
                            fontWeight: 500,
                            lineHeight: '100%',
                            letterSpacing: '-0.02em'
                          }}
                        >
                          Why this ranking?
                        </h4>
                        <p 
                          style={{ 
                            fontFamily: 'var(--font-serif)',
                            fontSize: '20px',
                            fontWeight: 400,
                            lineHeight: '120%',
                            letterSpacing: '-0.04em'
                          }}
                        >
                          {item.reasoning}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-border">
                        <h4 
                          className="mb-3"
                          style={{ 
                            fontFamily: 'var(--font-sans)',
                            fontSize: '16px',
                            fontWeight: 500,
                            lineHeight: '120%'
                          }}
                        >
                          Scoring Factors
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span 
                              style={{ 
                                fontFamily: 'var(--font-mono)',
                                fontSize: '14px',
                                fontWeight: 400,
                                color: 'var(--muted-foreground)'
                              }}
                            >
                              Deadline proximity and criticality
                            </span>
                            <span 
                              style={{ 
                                fontFamily: 'var(--font-mono)',
                                fontSize: '14px',
                                fontWeight: 500
                              }}
                            >
                              {item.breakdown.deadline}/50
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span 
                              style={{ 
                                fontFamily: 'var(--font-mono)',
                                fontSize: '14px',
                                fontWeight: 400,
                                color: 'var(--muted-foreground)'
                              }}
                            >
                              Sender importance and hierarchy
                            </span>
                            <span 
                              style={{ 
                                fontFamily: 'var(--font-mono)',
                                fontSize: '14px',
                                fontWeight: 500
                              }}
                            >
                              {item.breakdown.sender}/30
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span 
                              style={{ 
                                fontFamily: 'var(--font-mono)',
                                fontSize: '14px',
                                fontWeight: 400,
                                color: 'var(--muted-foreground)'
                              }}
                            >
                              AI-detected urgency signals
                            </span>
                            <span 
                              style={{ 
                                fontFamily: 'var(--font-mono)',
                                fontSize: '14px',
                                fontWeight: 500
                              }}
                            >
                              {item.breakdown.urgency}/20
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-border">
                        <Link
                          to={`/email/${item.id}`}
                          className="inline-flex items-center gap-2 px-4 py-3 bg-primary text-primary-foreground hover:shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.12),0px_8px_8px_-4px_rgba(0,0,0,0.08)] transition-shadow"
                          style={{ 
                            fontFamily: 'var(--font-mono)',
                            fontSize: '14px',
                            fontWeight: 500,
                            lineHeight: '100%'
                          }}
                        >
                          View full message
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Info Section */}
          <div className="mt-12 bg-secondary rounded-[16px] p-10">
            <h3 
              className="mb-8"
              style={{ 
                fontFamily: 'var(--font-sans)',
                fontSize: '40px',
                fontWeight: 500,
                lineHeight: '100%',
                letterSpacing: '-0.03em'
              }}
            >
              How Priority Scoring Works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="w-[42px] h-[42px] rounded-lg bg-white flex items-center justify-center mb-4">
                  <Clock className="w-5 h-5" />
                </div>
                <h4 
                  className="mb-2"
                  style={{ 
                    fontFamily: 'var(--font-sans)',
                    fontSize: '20px',
                    fontWeight: 500,
                    lineHeight: '100%',
                    letterSpacing: '-0.02em'
                  }}
                >
                  Deadline Analysis
                </h4>
                <p 
                  style={{ 
                    fontFamily: 'var(--font-serif)',
                    fontSize: '20px',
                    fontWeight: 400,
                    lineHeight: '120%',
                    letterSpacing: '-0.04em'
                  }}
                >
                  Time-based urgency calculated from explicit deadlines and meeting times. Weighted up to 50 points.
                </p>
              </div>

              <div>
                <div className="w-[42px] h-[42px] rounded-lg bg-white flex items-center justify-center mb-4">
                  <User className="w-5 h-5" />
                </div>
                <h4 
                  className="mb-2"
                  style={{ 
                    fontFamily: 'var(--font-sans)',
                    fontSize: '20px',
                    fontWeight: 500,
                    lineHeight: '100%',
                    letterSpacing: '-0.02em'
                  }}
                >
                  Sender Importance
                </h4>
                <p 
                  style={{ 
                    fontFamily: 'var(--font-serif)',
                    fontSize: '20px',
                    fontWeight: 400,
                    lineHeight: '120%',
                    letterSpacing: '-0.04em'
                  }}
                >
                  Organizational hierarchy and historical engagement patterns determine sender priority. Weighted up to 30 points.
                </p>
              </div>

              <div>
                <div className="w-[42px] h-[42px] rounded-lg bg-white flex items-center justify-center mb-4">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h4 
                  className="mb-2"
                  style={{ 
                    fontFamily: 'var(--font-sans)',
                    fontSize: '20px',
                    fontWeight: 500,
                    lineHeight: '100%',
                    letterSpacing: '-0.02em'
                  }}
                >
                  AI Urgency Detection
                </h4>
                <p 
                  style={{ 
                    fontFamily: 'var(--font-serif)',
                    fontSize: '20px',
                    fontWeight: 400,
                    lineHeight: '120%',
                    letterSpacing: '-0.04em'
                  }}
                >
                  Natural language processing identifies urgency signals, dependencies, and blocking issues. Weighted up to 20 points.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
