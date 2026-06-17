// Feed view + post cards

const timeAgo = (s) => s;

const PostHeader = ({ author, ts, kind, tags, onReport, onWhy }) => (
  <div className="post-header">
    <Avatar user={author} size={42} />
    <div className="post-meta">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <span className="post-name">{author.name}</span>
        {author.reputation != null && <RankBadge points={author.reputation} showLabel={false} />}
        {author.isFounder && <span className="chip chip-amber" style={{ padding: '1px 7px', fontSize: 10 }}>Founder</span>}
      </div>
      <div className="post-sub" style={{ marginTop: 2 }}>
        {author.title} · <span title={ts}>{ts} ago</span>
      </div>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <PostKindTag kind={kind} />
      <KebabMenu
        onReport={() => window.__openReport && window.__openReport({ kind, author: author.name })}
        onBlock={() => window.__toast && window.__toast(`Blocked ${author.name}`)}
        onHide={() => window.__toast && window.__toast('Post hidden from your feed')}
        onWhy={() => window.__openWhy && window.__openWhy()}
      />
    </div>
  </div>
);

const PostFooter = ({ post, savedSet, toggleSave, votedSet, toggleVote, onComment }) => {
  const c = post.counts || {};
  const voted = votedSet.has(post.id);
  const saved = savedSet.has(post.id);
  return (
    <div className="activity-row">
      <button className={`activity-btn ${voted ? 'active' : ''}`} onClick={() => toggleVote(post.id)}>
        <Icon name="upvote" size={15} />
        <span className="mono">{((c.upvotes || c.registrations || 0) + (voted ? 1 : 0)).toLocaleString()}</span>
      </button>
      {c.answers != null && (
        <button className="activity-btn" onClick={onComment}>
          <Icon name="comment" size={15} />
          <span>{c.answers} answers</span>
        </button>
      )}
      {c.downloads != null && (
        <button className="activity-btn">
          <Icon name="download" size={15} />
          <span>{c.downloads.toLocaleString()} downloads</span>
        </button>
      )}
      {c.responses != null && (
        <button className="activity-btn">
          <Icon name="comment" size={15} />
          <span>{c.responses} responses</span>
        </button>
      )}
      {c.applications != null && (
        <button className="activity-btn">
          <Icon name="users" size={15} />
          <span>{c.applications} applied</span>
        </button>
      )}
      {c.registrations != null && (
        <button className="activity-btn">
          <Icon name="users" size={15} />
          <span>{c.registrations.toLocaleString()} registered</span>
        </button>
      )}
      {c.comments != null && (
        <button className="activity-btn" onClick={onComment}>
          <Icon name="comment" size={15} />
          <span>{c.comments} comments</span>
        </button>
      )}
      <div style={{ flex: 1 }} />
      <button className={`activity-btn ${saved ? 'active' : ''}`} onClick={() => toggleSave(post.id)} title="Save">
        <Icon name="bookmark" size={15} />
      </button>
      <button className="activity-btn" title="Share">
        <Icon name="share" size={15} />
      </button>
    </div>
  );
};

const TagList = ({ tags }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
    {tags.map(t => <Tag key={t} name={t} />)}
  </div>
);

const QuestionCard = ({ post, ...rest }) => {
  const author = USER_MAP[post.author];
  return (
    <article className="feed-item fade-in">
      <PostHeader author={author} ts={post.ts} kind={post.kind} />
      <h3 style={{ fontSize: 17, lineHeight: 1.3, marginBottom: 8 }}>{post.title}</h3>
      <p style={{ color: 'var(--text-muted)', fontSize: 14, margin: 0, lineHeight: 1.55 }}>{post.body}</p>
      <TagList tags={post.tags} />
      <PostFooter post={post} {...rest} />
    </article>
  );
};

const ResourceCard = ({ post, ...rest }) => {
  const author = USER_MAP[post.author];
  const ft = post.file?.type || 'pdf';
  return (
    <article className="feed-item fade-in">
      <PostHeader author={author} ts={post.ts} kind={post.kind} />
      <h3 style={{ fontSize: 17, lineHeight: 1.3, marginBottom: 8 }}>{post.title}</h3>
      <p style={{ color: 'var(--text-muted)', fontSize: 14, margin: 0, lineHeight: 1.55 }}>{post.body}</p>

      <div
        onClick={() => window.__openPreview && window.__openPreview({ ...post, type: ft, title: post.file.name, size: post.file.size, downloads: post.counts?.downloads, uploadedBy: post.author })}
        style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 14, padding: 14, background: 'var(--bg-sunken)', borderRadius: 'var(--r-md)', border: '1px solid var(--border)', cursor: 'pointer', transition: 'border-color 0.15s' }}
        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--brand-400)'}
        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
      >
        <div className={`resource-preview ft-${ft}`} style={{ width: 64, height: 64, borderRadius: 'var(--r-sm)' }}>
          <span className="filetype" style={{ fontSize: 16 }}>{ft.toUpperCase()}</span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {post.file.name}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 2 }}>
            {post.file.size} · Free download · CC-BY-SA · <span style={{ color: 'var(--brand-700)', fontWeight: 600 }}>Click to preview</span>
          </div>
        </div>
        <button className="btn btn-outline" onClick={(e) => e.stopPropagation()}>
          <Icon name="download" size={14} />
          Download
        </button>
      </div>

      <TagList tags={post.tags} />
      <PostFooter post={post} {...rest} />
    </article>
  );
};

const JobCard = ({ post, ...rest }) => {
  const author = USER_MAP[post.author];
  return (
    <article className="feed-item fade-in">
      <PostHeader author={author} ts={post.ts} kind={post.kind} />
      <h3 style={{ fontSize: 17, lineHeight: 1.3, marginBottom: 6 }}>{post.title}</h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 13, color: 'var(--text-muted)', flexWrap: 'wrap', marginBottom: 10 }}>
        <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
          <Icon name="briefcase" size={13} />
          {post.company}
        </span>
        <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
          <Icon name="location" size={13} />
          {post.location}
        </span>
        <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center', fontWeight: 600, color: 'var(--brand-700)' }}>
          {post.salary}
        </span>
      </div>
      <p style={{ color: 'var(--text-muted)', fontSize: 14, margin: 0, lineHeight: 1.55 }}>{post.body}</p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14 }}>
        <button className="btn btn-amber">
          Apply now
          <Icon name="arrow" size={14} />
        </button>
        <button className="btn btn-outline">Save</button>
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 12, color: 'var(--text-dim)' }}>
          {post.counts.applications} applied · {post.counts.views} views
        </span>
      </div>

      <TagList tags={post.tags} />
    </article>
  );
};

const RequestCard = ({ post, ...rest }) => {
  const author = USER_MAP[post.author];
  return (
    <article className="feed-item fade-in" style={{ borderLeft: '3px solid var(--rose-500)' }}>
      <PostHeader author={author} ts={post.ts} kind={post.kind} />
      <h3 style={{ fontSize: 17, lineHeight: 1.3, marginBottom: 8 }}>{post.title}</h3>
      <p style={{ color: 'var(--text-muted)', fontSize: 14, margin: 0, lineHeight: 1.55 }}>{post.body}</p>
      <TagList tags={post.tags} />
      <PostFooter post={post} {...rest} />
    </article>
  );
};

const EventCard = ({ post, ...rest }) => {
  const author = USER_MAP[post.author];
  return (
    <article className="feed-item fade-in" style={{ background: 'linear-gradient(135deg, var(--amber-50), var(--bg-raised))', borderColor: 'var(--amber-300)' }}>
      <PostHeader author={author} ts={post.ts} kind={post.kind} />
      <h3 style={{ fontSize: 17, lineHeight: 1.3, marginBottom: 8 }}>{post.title}</h3>
      <p style={{ color: 'var(--text-muted)', fontSize: 14, margin: 0, lineHeight: 1.55 }}>{post.body}</p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 14, padding: '10px 14px', background: 'var(--bg-raised)', borderRadius: 'var(--r-md)', border: '1px solid var(--amber-300)' }}>
        <Icon name="clock" size={20} style={{ color: 'var(--amber-600)' }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 14 }}>{post.eventDate}</div>
          <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>{post.counts.registrations.toLocaleString()} registered · Free</div>
        </div>
        <button className="btn btn-amber">Register free</button>
      </div>

      <TagList tags={post.tags} />
    </article>
  );
};

const FeedItem = (props) => {
  const Comp = {
    question: QuestionCard,
    resource: ResourceCard,
    job: JobCard,
    request: RequestCard,
    event: EventCard,
  }[props.post.kind] || QuestionCard;
  return <Comp {...props} />;
};

const Compose = ({ currentUser, onAsk }) => {
  return (
    <div className="compose-card">
      <Avatar user={currentUser} size={40} />
      <input className="compose-input" placeholder="Ask a question, share a resource, or post a job…" readOnly onClick={onAsk} />
      <button className="btn btn-ghost" style={{ padding: 8 }} title="Share resource" onClick={onAsk}>
        <Icon name="resource" size={18} />
      </button>
      <button className="btn btn-ghost" style={{ padding: 8 }} title="Post job" onClick={onAsk}>
        <Icon name="briefcase" size={18} />
      </button>
    </div>
  );
};

const FeedFilters = ({ active, onChange }) => {
  const FILTERS = [
    { id: 'all', label: 'All' },
    { id: 'question', label: 'Questions' },
    { id: 'resource', label: 'Resources' },
    { id: 'job', label: 'Jobs' },
    { id: 'request', label: 'Requests' },
    { id: 'event', label: 'Events' },
  ];
  return (
    <div style={{ display: 'flex', gap: 6, marginBottom: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      {FILTERS.map(f => (
        <button
          key={f.id}
          onClick={() => onChange(f.id)}
          className="chip"
          style={{
            cursor: 'pointer',
            background: active === f.id ? 'var(--brand-800)' : 'var(--ink-100)',
            color: active === f.id ? '#fff' : 'var(--text-muted)',
            padding: '6px 12px',
            fontWeight: 600,
            fontSize: 13,
          }}
        >
          {f.label}
        </button>
      ))}
      <div style={{ flex: 1 }} />
      <button className="btn btn-ghost" style={{ padding: '6px 10px', fontSize: 13 }}>
        <Icon name="trend" size={14} />
        Hot
      </button>
      <button className="btn btn-ghost" style={{ padding: '6px 10px', fontSize: 13 }}>
        <Icon name="clock" size={14} />
        Newest
      </button>
    </div>
  );
};

Object.assign(window, { FeedItem, Compose, FeedFilters });
