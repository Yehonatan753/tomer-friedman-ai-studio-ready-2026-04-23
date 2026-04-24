export type AgentRole = 'user' | 'assistant';

export type AgentMessage = {
  role: AgentRole;
  content: string;
};

export type AgentResponse = {
  ok: boolean;
  answer: string;
  configured?: boolean;
  error?: string;
};

export async function sendAgentMessage(messages: AgentMessage[]): Promise<AgentResponse> {
  try {
    const response = await fetch('/api/agent/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      return {
        ok: false,
        answer: 'לא הצלחתי לקבל תשובה כרגע. אפשר להשאיר פרטים ותומר יחזור אליך בוואטסאפ.',
        error: 'agent-request-failed',
      };
    }

    return (await response.json()) as AgentResponse;
  } catch {
    return {
      ok: false,
      answer: 'אין כרגע חיבור לסוכן. אפשר להשאיר פרטים ותומר יחזור אליך בוואטסאפ.',
      error: 'agent-network-error',
    };
  }
}
