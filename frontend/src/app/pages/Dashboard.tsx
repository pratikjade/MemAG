import { Link } from "react-router";
import { Sidebar } from "../components/Sidebar";
import { Clock, Calendar } from "lucide-react";

const mockTasks = [
  {
    id: "1",
    sender: "Sarah Chen",
    subject: "Q4 Board Meeting - Strategic Review",
    urgency: 98,
    deadline: "Today, 3:00 PM",
    type: "Meeting request",
    preview: "Board members need the updated strategic deck before today's session..."
  },
  {
    id: "2",
    sender: "Mike Rodriguez",
    subject: "Investor Update: Series C Timeline",
    urgency: 94,
    deadline: "Tomorrow, 10:00 AM",
    type: "Email",
    preview: "Following up on our conversation about the Series C timeline and next steps..."
  },
  {
    id: "3",
    sender: "Emily Watson",
    subject: "Team Performance Reviews - Q4",
    urgency: 87,
    deadline: "This week",
    type: "Email",
    preview: "Reminder: Performance reviews are due by end of week. 12 reports pending..."
  },
  {
    id: "4",
    sender: "David Park",
    subject: "Product Roadmap Alignment",
    urgency: 82,
    deadline: "Next Monday",
    type: "Email",
    preview: "We need to sync on Q1 priorities and engineering capacity..."
  },
];

export function Dashboard() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto p-10">
          {/* Greeting */}
          <div className="mb-10">
            <h4 
              className="mb-2"
              style={{ 
                fontFamily: 'var(--font-sans)',
                fontSize: '40px',
                fontWeight: 500,
                lineHeight: '100%',
                letterSpacing: '-0.03em'
              }}
            >
              Good morning, Pratik.
            </h4>
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
              Tuesday, February 17, 2026
            </p>
          </div>

          {/* AI Summary Card */}
          <div className="bg-card rounded-[16px] border border-border p-10 mb-6">
            <div className="flex items-start justify-between mb-6">
              <div>
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
                  AI Summary
                </h3>
                <p 
                  style={{ 
                    fontFamily: 'var(--font-mono)',
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '100%',
                    color: 'var(--muted-foreground)'
                  }}
                >
                  Your priorities for today
                </p>
              </div>
            </div>

            <div className="space-y-4 mb-6 pb-6 border-b border-border">
              <div className="flex gap-4">
                <div 
                  className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 mt-1"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 500 }}
                >
                  3
                </div>
                <div>
                  <div 
                    className="mb-1"
                    style={{ 
                      fontFamily: 'var(--font-sans)',
                      fontSize: '16px',
                      fontWeight: 500,
                      lineHeight: '120%'
                    }}
                  >
                    High-priority items need attention
                  </div>
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
                    Board meeting prep, investor update, and 2 time-sensitive replies
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div 
                  className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-1"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 500 }}
                >
                  2
                </div>
                <div>
                  <div 
                    className="mb-1"
                    style={{ 
                      fontFamily: 'var(--font-sans)',
                      fontSize: '16px',
                      fontWeight: 500,
                      lineHeight: '120%'
                    }}
                  >
                    Suggested replies ready
                  </div>
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
                    Draft responses prepared for Mike Rodriguez and Emily Watson
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div 
                  className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-1"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 500 }}
                >
                  1
                </div>
                <div>
                  <div 
                    className="mb-1"
                    style={{ 
                      fontFamily: 'var(--font-sans)',
                      fontSize: '16px',
                      fontWeight: 500,
                      lineHeight: '120%'
                    }}
                  >
                    Meeting request detected
                  </div>
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
                    Sarah Chen is requesting time for strategic review
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span 
                style={{ 
                  fontFamily: 'var(--font-mono)',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '100%',
                  color: 'var(--muted-foreground)'
                }}
              >
                You have 3 time-sensitive items today
              </span>
              <Link 
                to="/priority-engine"
                className="flex items-center gap-1"
                style={{ 
                  fontFamily: 'var(--font-sans)',
                  fontSize: '16px',
                  fontWeight: 500,
                  lineHeight: '120%',
                  color: 'var(--link)'
                }}
              >
                View priority engine
                <svg width="9" height="12" viewBox="0 0 9 12" fill="none" className="-rotate-90">
                  <path d="M1 1L7.5 6L1 11" stroke="currentColor" strokeWidth="0.5"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Priority-ranked Task List */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4 pb-6 border-t border-border pt-6">
              <h3 
                style={{ 
                  fontFamily: 'var(--font-sans)',
                  fontSize: '20px',
                  fontWeight: 500,
                  lineHeight: '100%',
                  letterSpacing: '-0.02em'
                }}
              >
                Priority Inbox
              </h3>
            </div>

            <div className="space-y-4">
              {mockTasks.map((task) => (
                <Link
                  key={task.id}
                  to={`/email/${task.id}`}
                  className="block"
                >
                  <div className="bg-card rounded-[16px] border border-border p-6 hover:shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.12),0px_8px_8px_-4px_rgba(0,0,0,0.08)] transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span 
                            style={{ 
                              fontFamily: 'var(--font-sans)',
                              fontSize: '20px',
                              fontWeight: 500,
                              lineHeight: '100%',
                              letterSpacing: '-0.02em'
                            }}
                          >
                            {task.sender}
                          </span>
                          <span 
                            className="px-2 py-1 bg-muted rounded"
                            style={{ 
                              fontFamily: 'var(--font-mono)',
                              fontSize: '14px',
                              fontWeight: 400,
                              lineHeight: '100%',
                              color: 'var(--muted-foreground)'
                            }}
                          >
                            {task.type}
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
                          {task.subject}
                        </h3>
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
                          {task.preview}
                        </p>
                      </div>
                      <div className="ml-6 flex flex-col items-end gap-3">
                        <div 
                          className={`
                            px-3 py-1 rounded-lg font-mono
                            ${task.urgency >= 90 
                              ? 'bg-red-100 text-red-700' 
                              : task.urgency >= 85 
                              ? 'bg-yellow-100 text-yellow-700' 
                              : 'bg-green-100 text-green-700'
                            }
                          `}
                          style={{ 
                            fontFamily: 'var(--font-mono)',
                            fontSize: '14px',
                            fontWeight: 500,
                            lineHeight: '100%'
                          }}
                        >
                          {task.urgency}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span 
                          style={{ 
                            fontFamily: 'var(--font-mono)',
                            fontSize: '14px',
                            fontWeight: 400,
                            lineHeight: '100%',
                            color: 'var(--muted-foreground)'
                          }}
                        >
                          {task.deadline}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          className="px-3 py-3 bg-primary text-primary-foreground hover:shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.12),0px_8px_8px_-4px_rgba(0,0,0,0.08)] transition-shadow"
                          onClick={(e) => e.preventDefault()}
                          style={{ 
                            fontFamily: 'var(--font-mono)',
                            fontSize: '14px',
                            fontWeight: 500,
                            lineHeight: '100%'
                          }}
                        >
                          Reply
                        </button>
                        <button 
                          className="px-3 py-3 bg-primary text-primary-foreground hover:shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.12),0px_8px_8px_-4px_rgba(0,0,0,0.08)] transition-shadow"
                          onClick={(e) => e.preventDefault()}
                          style={{ 
                            fontFamily: 'var(--font-mono)',
                            fontSize: '14px',
                            fontWeight: 500,
                            lineHeight: '100%'
                          }}
                        >
                          Schedule
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Calendar Preview Card */}
          <div className="bg-secondary rounded-[16px] p-10 border-t border-border">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6" />
              <h3 
                style={{ 
                  fontFamily: 'var(--font-sans)',
                  fontSize: '20px',
                  fontWeight: 500,
                  lineHeight: '100%',
                  letterSpacing: '-0.02em'
                }}
              >
                Today's Schedule
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4 pb-4 border-b border-border">
                <div className="text-center">
                  <div 
                    style={{ 
                      fontFamily: 'var(--font-mono)',
                      fontSize: '14px',
                      fontWeight: 400,
                      color: 'var(--muted-foreground)'
                    }}
                  >
                    10:00
                  </div>
                  <div 
                    style={{ 
                      fontFamily: 'var(--font-mono)',
                      fontSize: '14px',
                      fontWeight: 400,
                      color: 'var(--muted-foreground)'
                    }}
                  >
                    11:00
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-lg p-4">
                  <div 
                    className="mb-1"
                    style={{ 
                      fontFamily: 'var(--font-sans)',
                      fontSize: '16px',
                      fontWeight: 500,
                      lineHeight: '120%'
                    }}
                  >
                    Executive Team Sync
                  </div>
                  <div 
                    style={{ 
                      fontFamily: 'var(--font-mono)',
                      fontSize: '14px',
                      fontWeight: 400,
                      lineHeight: '100%',
                      color: 'var(--muted-foreground)'
                    }}
                  >
                    Weekly alignment meeting
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pb-4 border-b border-border">
                <div className="text-center">
                  <div 
                    style={{ 
                      fontFamily: 'var(--font-mono)',
                      fontSize: '14px',
                      fontWeight: 400,
                      color: 'var(--muted-foreground)'
                    }}
                  >
                    15:00
                  </div>
                  <div 
                    style={{ 
                      fontFamily: 'var(--font-mono)',
                      fontSize: '14px',
                      fontWeight: 400,
                      color: 'var(--muted-foreground)'
                    }}
                  >
                    16:30
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-lg p-4">
                  <div 
                    className="mb-1"
                    style={{ 
                      fontFamily: 'var(--font-sans)',
                      fontSize: '16px',
                      fontWeight: 500,
                      lineHeight: '120%'
                    }}
                  >
                    Q4 Board Meeting
                  </div>
                  <div 
                    style={{ 
                      fontFamily: 'var(--font-mono)',
                      fontSize: '14px',
                      fontWeight: 400,
                      lineHeight: '100%',
                      color: 'var(--muted-foreground)'
                    }}
                  >
                    Strategic review with board members
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-center">
                  <div 
                    style={{ 
                      fontFamily: 'var(--font-mono)',
                      fontSize: '14px',
                      fontWeight: 400,
                      color: 'var(--muted-foreground)'
                    }}
                  >
                    17:00
                  </div>
                  <div 
                    style={{ 
                      fontFamily: 'var(--font-mono)',
                      fontSize: '14px',
                      fontWeight: 400,
                      color: 'var(--muted-foreground)'
                    }}
                  >
                    17:30
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-lg p-4">
                  <div 
                    className="mb-1"
                    style={{ 
                      fontFamily: 'var(--font-sans)',
                      fontSize: '16px',
                      fontWeight: 500,
                      lineHeight: '120%'
                    }}
                  >
                    1:1 with Emily
                  </div>
                  <div 
                    style={{ 
                      fontFamily: 'var(--font-mono)',
                      fontSize: '14px',
                      fontWeight: 400,
                      lineHeight: '100%',
                      color: 'var(--muted-foreground)'
                    }}
                  >
                    Performance review discussion
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
