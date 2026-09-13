const paths: Record<string, string> = {
  home: "m3 10 9-7 9 7v10H3V10Zm6 10v-7h6v7",
  requests: "M7 3h10v3H7V3ZM7 5H4v16h16V5h-3M8 11h8M8 15h6",
  vehicle: "m3 10 3-6h12l3 6v9H3v-9Zm0 0h18M7 14h1m8 0h1M6 19v2m12-2v2",
  account: "M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4 21v-3a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v3",
  support: "M3 13v-2a9 9 0 0 1 18 0v6h-4v-6h4M3 11h4v6H3v-6Zm18 6v2l-4 2h-4",
  battery: "M3 7h18v13H3V7Zm3 0V4h3v3m6 0V4h3v3M6 13h4m-2-2v4m6-2h4",
  tyre: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-5 0a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM6 5l3 4m6 6 3 4M5 18l4-3m6-6 4-3",
  tow: "M2 6h11v11H2V6Zm11 5h5l4 5v1h-9M5 17a2 2 0 1 0 4 0m7 0a2 2 0 1 0 4 0",
  engine: "M5 8h3l2-3h6l2 3h3v11H5V8ZM1 10v7m0-4h4m7-8V2m-3 0h6m0 9-3 4h4l-3 4",
  fuel: "M4 21V4h10v17M2 21h14M7 7h4v4H7V7Zm7 6h3v5a2 2 0 0 0 4 0V8l-4-4",
  key: "M14 10a5 5 0 1 0-4 4l9 7 3-3-3-3-2 1-3-3v-3ZM6 6h.01",
  pin: "M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Zm-4 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
  arrow: "M4 12h16m-6-6 6 6-6 6",
  check: "m5 12 4 4L19 6",
  plus: "M12 4v16M4 12h16",
  clock: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM12 7v5l3 2",
};
export default function Icon({ name, size = 22 }: { name: string; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] ?? paths.support} /></svg>;
}
