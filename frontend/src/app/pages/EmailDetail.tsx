import { Link, useParams } from "react-router";
import { Sidebar } from "../components/Sidebar";
import { ArrowLeft, Clock, User } from "lucide-react";
import { useState } from "react";

const mockEmails = {
  "1": {
    sender: "Sarah Chen",
    subject: "Q4 Board Meeting - Strategic Review",
    time: "2 hours ago",
    urgency: 98,
    deadline: "Today, 3:00 PM",
    content: `Hi Pratik,

I hope this message finds you well. I wanted to reach out regarding the upcoming Q4 Board Meeting scheduled for today at 3:00 PM.

The board members have requested an updated strategic deck that covers:
- Q4 performance metrics and key achievements
- Updated financial projections for next quarter
- Strategic initiatives and roadmap adjustments
- Competitive landscape analysis

Could you please share the latest version before the meeting? Several board members want to review it in advance.

Also, we should discuss the Series C timeline and how it aligns with our growth strategy.

Looking forward to your response.

Best regards,
Sarah Chen
Chief of Staff`,
    aiSummary: {
      keyPoints: [
        "Board meeting today at 3:00 PM requires updated strategic deck",
        "Board members need advance review of materials",
        "Discussion needed on Series C timeline alignment"
      ],
      suggestedActions: [
        "Share updated strategic deck immediately",
        "Schedule 15-min prep call before board meeting",
        "Prepare Series C talking points"
      ]
    },
    thread: [
      {
        sender: "Sarah Chen",
        time: "2 days ago",
        preview: "Following up on the board meeting agenda..."
      },
      {
        sender: "You",
        time: "3 days ago",
        preview: "Thanks for coordinating. I'll prepare the deck..."
      }
    ]
  }
};

export function EmailDetail() {
  const { id } = useParams();
  const email = mockEmails[id as keyof typeof mockEmails];
  const [selectedTone, setSelectedTone] = useState<string>("concise");

  if (!email) {
    return <div>Email not found</div>;
  }

  const tones = ["Concise", "Formal", "Direct"];

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-auto flex">
        {/* Thread List */}
        <div className="w-80 border-r border-border overflow-auto bg-secondary">
          <div className="p-5 border-b border-border">
            <Link 
              to="/dashboard"
              className="flex items-center gap-2"
              style={{ 
                fontFamily: 'var(--font-sans)',
                fontSize: '16px',
                fontWeight: 500,
                lineHeight: '120%',
                color: 'var(--link)'
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to inbox
            </Link>
          </div>

          <div className="p-4">
            <h3 
              className="mb-4 px-2"
              style={{ 
                fontFamily: 'var(--font-sans)',
                fontSize: '20px',
                fontWeight: 500,
                lineHeight: '100%',
                letterSpacing: '-0.02em'
              }}
            >
              Thread
            </h3>
            <div className="space-y-2">
              {email.thread.map((msg, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-lg border border-border bg-white hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span 
                      style={{ 
                        fontFamily: 'var(--font-sans)',
                        fontSize: '16px',
                        fontWeight: 500,
                        lineHeight: '120%'
                      }}
                    >
                      {msg.sender}
                    </span>
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
                    {msg.preview}
                  </p>
                  <div 
                    className="mt-2"
                    style={{ 
                      fontFamily: 'var(--font-mono)',
                      fontSize: '14px',
                      fontWeight: 400,
                      color: 'var(--muted-foreground)'
                    }}
                  >
                    {msg.time}
                  </div>
                </div>
              ))}
              <div className="p-4 rounded-lg bg-white border-2 border-primary">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span 
                    style={{ 
                      fontFamily: 'var(--font-sans)',
                      fontSize: '16px',
                      fontWeight: 500,
                      lineHeight: '120%'
                    }}
                  >
                    {email.sender}
                  </span>
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
                  {email.subject}
                </p>
                <div 
                  className="mt-2"
                  style={{ 
                    fontFamily: 'var(--font-mono)',
                    fontSize: '14px',
                    fontWeight: 400,
                    color: 'var(--muted-foreground)'
                  }}
                >
                  {email.time}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Email Content */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-3xl mx-auto p-10">
            {/* Header */}
            <div className="mb-8 pb-6 border-b border-border">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 
                    className="mb-4"
                    style={{ 
                      fontFamily: 'var(--font-sans)',
                      fontSize: '40px',
                      fontWeight: 500,
                      lineHeight: '100%',
                      letterSpacing: '-0.03em'
                    }}
                  >
                    {email.subject}
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center"
                        style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 500 }}
                      >
                        SC
                      </div>
                      <div>
                        <div 
                          style={{ 
                            fontFamily: 'var(--font-sans)',
                            fontSize: '20px',
                            fontWeight: 500,
                            lineHeight: '100%',
                            letterSpacing: '-0.02em'
                          }}
                        >
                          {email.sender}
                        </div>
                        <div 
                          style={{ 
                            fontFamily: 'var(--font-mono)',
                            fontSize: '14px',
                            fontWeight: 400,
                            color: 'var(--muted-foreground)'
                          }}
                        >
                          {email.time}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div 
                  className="px-4 py-2 rounded-lg bg-red-100 text-red-700"
                  style={{ 
                    fontFamily: 'var(--font-mono)',
                    fontSize: '16px',
                    fontWeight: 500
                  }}
                >
                  {email.urgency}
                </div>
              </div>

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
                  Deadline: {email.deadline}
                </span>
              </div>
            </div>

            {/* AI Summary */}
            <div className="bg-secondary rounded-[16px] p-6 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <h3 
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
              </div>

              <div className="mb-6">
                <h4 
                  className="mb-3"
                  style={{ 
                    fontFamily: 'var(--font-sans)',
                    fontSize: '16px',
                    fontWeight: 500,
                    lineHeight: '120%'
                  }}
                >
                  Key Points
                </h4>
                <ul className="space-y-2">
                  {email.aiSummary.keyPoints.map((point, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="text-muted-foreground">•</span>
                      <span 
                        style={{ 
                          fontFamily: 'var(--font-serif)',
                          fontSize: '20px',
                          fontWeight: 400,
                          lineHeight: '120%',
                          letterSpacing: '-0.04em'
                        }}
                      >
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 
                  className="mb-3"
                  style={{ 
                    fontFamily: 'var(--font-sans)',
                    fontSize: '16px',
                    fontWeight: 500,
                    lineHeight: '120%'
                  }}
                >
                  Suggested Actions
                </h4>
                <div className="space-y-2">
                  {email.aiSummary.suggestedActions.map((action, idx) => (
                    <div 
                      key={idx}
                      className="flex items-start gap-3 p-3 bg-white rounded-lg"
                    >
                      <div className="w-5 h-5 rounded bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        ✓
                      </div>
                      <span 
                        style={{ 
                          fontFamily: 'var(--font-serif)',
                          fontSize: '20px',
                          fontWeight: 400,
                          lineHeight: '120%',
                          letterSpacing: '-0.04em'
                        }}
                      >
                        {action}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Email Body */}
            <div className="mb-8">
              <div 
                className="whitespace-pre-line"
                style={{ 
                  fontFamily: 'var(--font-serif)',
                  fontSize: '20px',
                  fontWeight: 400,
                  lineHeight: '120%',
                  letterSpacing: '-0.04em'
                }}
              >
                {email.content}
              </div>
            </div>

            {/* Suggested Reply */}
            <div className="bg-card border border-border rounded-[16px] p-6 mb-8">
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
                  Suggested Reply
                </h3>
                <div className="flex gap-2">
                  {tones.map((tone) => (
                    <button
                      key={tone}
                      onClick={() => setSelectedTone(tone.toLowerCase())}
                      className={`
                        px-3 py-3 transition-all
                        ${selectedTone === tone.toLowerCase()
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary hover:shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.12),0px_8px_8px_-4px_rgba(0,0,0,0.08)]'
                        }
                      `}
                      style={{ 
                        fontFamily: 'var(--font-mono)',
                        fontSize: '14px',
                        fontWeight: 500,
                        lineHeight: '100%'
                      }}
                    >
                      {tone}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6 p-4 bg-secondary rounded-lg">
                <p 
                  className="mb-4"
                  style={{ 
                    fontFamily: 'var(--font-serif)',
                    fontSize: '20px',
                    fontWeight: 400,
                    lineHeight: '120%',
                    letterSpacing: '-0.04em'
                  }}
                >
                  Hi Sarah,
                </p>
                <p 
                  className="mb-4"
                  style={{ 
                    fontFamily: 'var(--font-serif)',
                    fontSize: '20px',
                    fontWeight: 400,
                    lineHeight: '120%',
                    letterSpacing: '-0.04em'
                  }}
                >
                  Thanks for the heads up. I'll send the updated strategic deck within the next hour. It includes all the requested sections with the latest Q4 metrics and projections.
                </p>
                <p 
                  className="mb-4"
                  style={{ 
                    fontFamily: 'var(--font-serif)',
                    fontSize: '20px',
                    fontWeight: 400,
                    lineHeight: '120%',
                    letterSpacing: '-0.04em'
                  }}
                >
                  I've also prepared talking points on the Series C timeline. We can discuss the alignment during the meeting.
                </p>
                <p 
                  style={{ 
                    fontFamily: 'var(--font-serif)',
                    fontSize: '20px',
                    fontWeight: 400,
                    lineHeight: '120%',
                    letterSpacing: '-0.04em'
                  }}
                >
                  Best,<br />
                  Pratik
                </p>
              </div>

              <div className="flex gap-3">
                <button 
                  className="flex-1 px-4 py-3 bg-primary text-primary-foreground hover:shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.12),0px_8px_8px_-4px_rgba(0,0,0,0.08)] transition-shadow"
                  style={{ 
                    fontFamily: 'var(--font-mono)',
                    fontSize: '14px',
                    fontWeight: 500,
                    lineHeight: '100%'
                  }}
                >
                  Send Reply
                </button>
                <button 
                  className="px-4 py-3 bg-primary text-primary-foreground hover:shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.12),0px_8px_8px_-4px_rgba(0,0,0,0.08)] transition-shadow"
                  style={{ 
                    fontFamily: 'var(--font-mono)',
                    fontSize: '14px',
                    fontWeight: 500,
                    lineHeight: '100%'
                  }}
                >
                  Edit
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-3">
              <button 
                className="flex-1 px-4 py-3 bg-primary text-primary-foreground hover:shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.12),0px_8px_8px_-4px_rgba(0,0,0,0.08)] transition-shadow flex items-center justify-center gap-2"
                style={{ 
                  fontFamily: 'var(--font-mono)',
                  fontSize: '14px',
                  fontWeight: 500,
                  lineHeight: '100%'
                }}
              >
                <Clock className="w-4 h-4" />
                Schedule Meeting
              </button>
              <button 
                className="flex-1 px-4 py-3 bg-primary text-primary-foreground hover:shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.12),0px_8px_8px_-4px_rgba(0,0,0,0.08)] transition-shadow"
                style={{ 
                  fontFamily: 'var(--font-mono)',
                  fontSize: '14px',
                  fontWeight: 500,
                  lineHeight: '100%'
                }}
              >
                Mark Complete
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
