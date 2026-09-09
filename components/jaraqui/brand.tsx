export function FishMark({ title }: { title?: string }) {
  return (
    <svg
      className="jaraqui-mark"
      viewBox="0 0 72 52"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
    >
      {title && <title>{title}</title>}
      <path
        className="mark-body"
        d="M5.5 26C14 10.8 32 5 48.2 13.1L66 4.8l-5.8 21.1L66 47.2l-17.8-8.3C32 47 14 41.2 5.5 26Z"
      />
      <path
        className="mark-river"
        d="M14.3 24.2c7.9-4.8 18.2-4.3 24.6 1.2 3.9 3.4 3 10.5-2.1 12.4-5.4 2.1-11.1-.2-12.8-5.1"
      />
      <path className="mark-current" d="M14.8 29.4c4.2 2.8 9.2 3.9 14.1 3.1" />
      <circle className="mark-eye" cx="20" cy="19" r="2.2" />
    </svg>
  );
}

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <div className={`brand-lockup ${light ? 'light' : ''}`} aria-label="Jaraqui Pay">
      <FishMark />
      <strong>
        Jaraqui<span>Pay</span>
      </strong>
    </div>
  );
}
