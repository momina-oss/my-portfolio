import { useEffect, useRef, useState } from 'react'
import styles from './directmessage.module.css'

const conversations = [
  {
    id: 1,
    name: 'Flowmode Support',
    initials: 'FS',
    role: 'Customer Support',
    avatar: 'support',
    online: true,
    time: '2m',
    unread: 2,
    preview: 'Sure, I can help with that billing question.',
  },
  {
    id: 2,
    name: 'Amir Rahman',
    initials: 'AR',
    role: 'Team Member',
    avatar: 'amir',
    online: true,
    time: '1h',
    unread: 0,
    preview: 'I shared the session report with you.',
  },
  {
    id: 3,
    name: 'Billing Assistant',
    initials: 'BA',
    role: 'Automated',
    avatar: 'bot',
    online: false,
    time: '1d',
    unread: 0,
    preview: 'Your September receipt is ready.',
  },
  {
    id: 4,
    name: 'Nadia Khan',
    initials: 'NK',
    role: 'Team Member',
    avatar: 'nadia',
    online: false,
    time: '2d',
    unread: 0,
    preview: 'Sounds good, see you Monday!',
  },
]

const starterMessages = [
  {
    id: 1,
    from: 'them',
    text: 'Hi! I noticed I was charged twice for my Pro subscription this month.',
    time: '10:02 AM',
  },
  {
    id: 2,
    from: 'them',
    text: 'Could you take a look?',
    time: '10:02 AM',
  },
  {
    id: 3,
    from: 'me',
    text: 'Hi Jane — sorry about that! Let me pull up your billing history.',
    time: '10:04 AM',
    read: true,
  },
  {
    id: 4,
    from: 'me',
    text: "I can confirm there was a duplicate charge on Sept 14th. I've refunded $9.00 back to your card.",
    time: '10:06 AM',
    read: true,
  },
  {
    id: 5,
    from: 'them',
    text: "That's great, thank you! How long until it shows up?",
    time: '10:07 AM',
  },
  {
    id: 6,
    from: 'me',
    text: 'Sure, I can help with that billing question. Refunds usually take 3–5 business days to appear.',
    time: '10:08 AM',
    read: false,
  },
]

export default function DirectMessage() {
  const [activeId, setActiveId] = useState(1)
  const [messages, setMessages] = useState(starterMessages)
  const [draft, setDraft] = useState('')
  const [search, setSearch] = useState('')
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef(null)

  const active =
    conversations.find((conversation) => conversation.id === activeId) ||
    conversations[0]

  const filteredConversations = conversations.filter((conversation) =>
    `${conversation.name} ${conversation.role} ${conversation.preview}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages, typing])

  const selectConversation = (id) => {
    setActiveId(id)

    // Keep the demo focused on the selected conversation.
    if (id !== 1) {
      setMessages([
        {
          id: Date.now(),
          from: 'them',
          text:
            conversations.find((conversation) => conversation.id === id)
              ?.preview || 'Hey! How can I help?',
          time: 'Now',
        },
      ])
    } else {
      setMessages(starterMessages)
    }
  }

  const sendMessage = (event) => {
    event.preventDefault()

    if (!draft.trim()) return

    const message = {
      id: Date.now(),
      from: 'me',
      text: draft.trim(),
      time: 'Now',
      read: false,
    }

    setMessages((current) => [...current, message])
    setDraft('')
    setTyping(true)

    setTimeout(() => {
      setTyping(false)

      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          from: 'them',
          text: 'Got it, thanks for the update! I’ll take care of that.',
          time: 'Now',
        },
      ])
    }, 1600)
  }

  return (
    <main className={styles.page}>
      <div className={styles.glowOne} />
      <div className={styles.glowTwo} />

      <section className={styles.appShell}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.brandRow}>
            <div>
              <span className={styles.eyebrow}>FLOWMODE</span>
              <h1>Messages</h1>
            </div>

            <button className={styles.composeButton} title="New message">
              <span>+</span>
            </button>
          </div>

          <div className={styles.inboxMeta}>
            <span>Inbox</span>
            <span className={styles.inboxCount}>4</span>
          </div>

          <label className={styles.searchBox}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" />
              <path d="m16 16 4 4" />
            </svg>

            <input
              type="text"
              placeholder="Search conversations"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <span className={styles.searchShortcut}>⌘ K</span>
          </label>

          <div className={styles.filterRow}>
            <button className={styles.filterActive}>All</button>
            <button>Unread</button>
            <button>Support</button>
          </div>

          <div className={styles.conversationList}>
            {filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                className={`${styles.conversation} ${
                  conversation.id === activeId
                    ? styles.conversationActive
                    : ''
                }`}
                onClick={() => selectConversation(conversation.id)}
              >
                <div className={`${styles.avatar} ${styles[conversation.avatar]}`}>
                  {conversation.initials}
                  {conversation.online && (
                    <span className={styles.onlineIndicator} />
                  )}
                </div>

                <div className={styles.conversationBody}>
                  <div className={styles.conversationTop}>
                    <strong>{conversation.name}</strong>
                    <time>{conversation.time}</time>
                  </div>

                  <div className={styles.conversationBottom}>
                    <span>{conversation.preview}</span>

                    {conversation.unread > 0 && (
                      <b className={styles.unread}>
                        {conversation.unread}
                      </b>
                    )}
                  </div>
                </div>
              </button>
            ))}

            {filteredConversations.length === 0 && (
              <div className={styles.emptySearch}>
                <span>⌕</span>
                <p>No conversations found</p>
              </div>
            )}
          </div>

          <div className={styles.sidebarFooter}>
            <div className={styles.profileMini}>
              <div className={styles.myAvatar}>MK</div>

              <div>
                <strong>Jane Mitchell</strong>
                <span>Pro workspace</span>
              </div>
            </div>

            <button className={styles.moreButton}>•••</button>
          </div>
        </aside>

        {/* Chat */}
        <section className={styles.chat}>
          <header className={styles.chatHeader}>
            <div className={`${styles.avatar} ${styles[active.avatar]}`}>
              {active.initials}
              {active.online && <span className={styles.onlineIndicator} />}
            </div>

            <div className={styles.contactInfo}>
              <div className={styles.nameLine}>
                <h2>{active.name}</h2>
                <span className={styles.verified}>✓</span>
              </div>

              <span>
                <i className={active.online ? styles.liveDot : styles.offlineDot} />
                {active.online ? 'Active now' : active.role}
              </span>
            </div>

            <div className={styles.headerActions}>
              <button title="Search">
                <svg viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="6.5" />
                  <path d="m16 16 4 4" />
                </svg>
              </button>

              <button title="Call">
                <svg viewBox="0 0 24 24">
                  <path d="M6.8 4.5 9 4l2 4-2 1.6c.9 2 2.4 3.5 4.4 4.4L15 12l4 2 .5 2.2c.2.9-.3 1.8-1.2 2.1-1.4.5-3.1.1-4.8-.8-3.7-2-6.7-5-8.7-8.7-.9-1.7-1.3-3.4-.8-4.8.3-.9 1.2-1.4 2.1-1.2Z" />
                </svg>
              </button>

              <button title="More">•••</button>
            </div>
          </header>

          <div className={styles.chatContext}>
            <span className={styles.contextIcon}>✦</span>
            <div>
              <strong>Billing support</strong>
              <span>Ticket #FM-2941 · Pro subscription</span>
            </div>

            <button>View ticket</button>
          </div>

          <div className={styles.messages} ref={scrollRef}>
            <div className={styles.dateDivider}>
              <span>Today · September 26</span>
            </div>

            <div className={styles.introCard}>
              <div className={styles.introIcon}>✦</div>
              <strong>Support conversation</strong>
              <span>
                Messages are end-to-end protected and this ticket is assigned
                to Flowmode Support.
              </span>
            </div>

            {messages.map((message, index) => {
              const isMine = message.from === 'me'
              const showAvatar =
                !isMine &&
                (index === 0 || messages[index - 1]?.from !== 'them')

              return (
                <div
                  key={message.id}
                  className={`${styles.messageRow} ${
                    isMine ? styles.messageMine : styles.messageThem
                  }`}
                >
                  {!isMine && (
                    <div className={styles.messageAvatarSpace}>
                      {showAvatar && (
                        <div className={`${styles.miniAvatar} ${styles[active.avatar]}`}>
                          {active.initials.slice(0, 1)}
                        </div>
                      )}
                    </div>
                  )}

                  <div className={styles.messageColumn}>
                    <div
                      className={`${styles.messageBubble} ${
                        isMine
                          ? styles.messageBubbleMine
                          : styles.messageBubbleThem
                      }`}
                    >
                      {message.text}
                    </div>

                    <div className={styles.messageMeta}>
                      <span>{message.time}</span>

                      {isMine && (
                        <span
                          className={
                            message.read
                              ? styles.readReceipt
                              : styles.sentReceipt
                          }
                        >
                          {message.read ? '✓✓ Read' : '✓ Sent'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}

            {typing && (
              <div className={`${styles.messageRow} ${styles.messageThem}`}>
                <div className={styles.messageAvatarSpace}>
                  <div className={`${styles.miniAvatar} ${styles[active.avatar]}`}>
                    {active.initials.slice(0, 1)}
                  </div>
                </div>

                <div className={styles.typingBubble}>
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}
          </div>

          <form className={styles.composer} onSubmit={sendMessage}>
            <button type="button" className={styles.composerIcon} title="Attach">
              +
            </button>

            <input
              type="text"
              placeholder="Write a message..."
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
            />

            <button
              type="button"
              className={styles.emojiButton}
              title="Add emoji"
            >
              ☺
            </button>

            <button
              type="submit"
              className={styles.sendButton}
              disabled={!draft.trim()}
              title="Send message"
            >
              <svg viewBox="0 0 24 24">
                <path d="M21 3 10.8 13.2" />
                <path d="m21 3-6.5 18-3.7-7.3L3.5 10 21 3Z" />
              </svg>
            </button>
          </form>

          <div className={styles.composerHint}>
            <span>↵</span> Enter to send
            <span className={styles.hintDivider}>•</span>
            <span>⌘</span> K to search
          </div>
        </section>
      </section>
    </main>
  )
}