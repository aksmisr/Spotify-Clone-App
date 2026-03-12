import { useState, useRef, useEffect, useCallback } from "react";

const tracks = [
  { id: 1, title: "Blinding Lights", artist: "The Weeknd", album: "After Hours", duration: 200, cover: "https://picsum.photos/seed/blinding/300/300", genre: "Pop" },
  { id: 2, title: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia", duration: 203, cover: "https://picsum.photos/seed/levitating/300/300", genre: "Pop" },
  { id: 3, title: "Stay", artist: "The Kid LAROI", album: "F*CK LOVE 3", duration: 141, cover: "https://picsum.photos/seed/stay123/300/300", genre: "Hip-Hop" },
  { id: 4, title: "Peaches", artist: "Justin Bieber", album: "Justice", duration: 198, cover: "https://picsum.photos/seed/peaches22/300/300", genre: "R&B" },
  { id: 5, title: "Good 4 U", artist: "Olivia Rodrigo", album: "SOUR", duration: 178, cover: "https://picsum.photos/seed/good4u/300/300", genre: "Pop-Rock" },
  { id: 6, title: "Montero", artist: "Lil Nas X", album: "Montero", duration: 137, cover: "https://picsum.photos/seed/montero1/300/300", genre: "Hip-Hop" },
  { id: 7, title: "Save Your Tears", artist: "The Weeknd", album: "After Hours", duration: 215, cover: "https://picsum.photos/seed/savetears/300/300", genre: "Pop" },
  { id: 8, title: "Kiss Me More", artist: "Doja Cat", album: "Planet Her", duration: 208, cover: "https://picsum.photos/seed/kissme99/300/300", genre: "Pop" },
  { id: 9, title: "drivers license", artist: "Olivia Rodrigo", album: "SOUR", duration: 242, cover: "https://picsum.photos/seed/drivers9/300/300", genre: "Pop" },
  { id: 10, title: "Butter", artist: "BTS", album: "Butter", duration: 164, cover: "https://picsum.photos/seed/butter77/300/300", genre: "K-Pop" },
  { id: 11, title: "Happier Than Ever", artist: "Billie Eilish", album: "Happier Than Ever", duration: 295, cover: "https://picsum.photos/seed/happier5/300/300", genre: "Alt-Pop" },
  { id: 12, title: "Industry Baby", artist: "Lil Nas X", album: "Montero", duration: 212, cover: "https://picsum.photos/seed/industry3/300/300", genre: "Hip-Hop" },
];

const playlists = [
  { id: 1, name: "Today's Top Hits", tracks: [1, 2, 3, 4, 5], cover: "https://picsum.photos/seed/playlist1/300/300" },
  { id: 2, name: "Chill Vibes", tracks: [6, 7, 8, 9], cover: "https://picsum.photos/seed/playlist2/300/300" },
  { id: 3, name: "Workout Mix", tracks: [10, 11, 12, 1], cover: "https://picsum.photos/seed/playlist3/300/300" },
  { id: 4, name: "Late Night", tracks: [2, 4, 7, 11], cover: "https://picsum.photos/seed/playlist4/300/300" },
];

const formatTime = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

const Icon = ({ name, size = 20 }) => {
  const icons = {
    home: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>,
    search: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>,
    library: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 5h-3v5.5c0 1.38-1.12 2.5-2.5 2.5S10 13.88 10 12.5s1.12-2.5 2.5-2.5c.57 0 1.08.19 1.5.51V5h4v2zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z"/></svg>,
    plus: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>,
    heart: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>,
    play: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>,
    pause: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>,
    skip_next: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>,
    skip_prev: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/></svg>,
    shuffle: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M10.59 9.17 5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/></svg>,
    repeat: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/></svg>,
    volume: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>,
    mute: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z"/></svg>,
    queue: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z"/></svg>,
    ellipsis: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>,
  };
  return icons[name] || null;
};

export default function SpotifyClone() {
  const [currentTrack, setCurrentTrack] = useState(tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [liked, setLiked] = useState(new Set());
  const [activeView, setActiveView] = useState("home");
  const [activePlaylist, setActivePlaylist] = useState(null);
  const [queue, setQueue] = useState(tracks);
  const [elapsed, setElapsed] = useState(0);

  const intervalRef = useRef(null);

  const startTimer = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setElapsed((e) => {
        if (e >= currentTrack.duration) {
          handleNext();
          return 0;
        }
        setProgress(((e + 1) / currentTrack.duration) * 100);
        return e + 1;
      });
    }, 1000);
  }, [currentTrack]);

  useEffect(() => {
    if (isPlaying) startTimer();
    else clearInterval(intervalRef.current);
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, startTimer]);

  const playTrack = (track) => {
    setCurrentTrack(track);
    setElapsed(0);
    setProgress(0);
    setIsPlaying(true);
  };

  const handleNext = useCallback(() => {
    const idx = queue.findIndex((t) => t.id === currentTrack.id);
    const next = isShuffle
      ? queue[Math.floor(Math.random() * queue.length)]
      : queue[(idx + 1) % queue.length];
    playTrack(next);
  }, [currentTrack, queue, isShuffle]);

  const handlePrev = () => {
    if (elapsed > 3) { setElapsed(0); setProgress(0); return; }
    const idx = queue.findIndex((t) => t.id === currentTrack.id);
    const prev = queue[(idx - 1 + queue.length) % queue.length];
    playTrack(prev);
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const newElapsed = Math.floor(ratio * currentTrack.duration);
    setElapsed(newElapsed);
    setProgress(ratio * 100);
  };

  const toggleLike = (id) => {
    setLiked((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const openPlaylist = (pl) => {
    setActivePlaylist(pl);
    setQueue(pl.tracks.map((id) => tracks.find((t) => t.id === id)));
    setActiveView("playlist");
  };

  const displayTracks = activeView === "playlist" && activePlaylist
    ? activePlaylist.tracks.map((id) => tracks.find((t) => t.id === id))
    : tracks;

  return (
    <div style={{ fontFamily: "'Circular', 'Helvetica Neue', sans-serif", background: "#000", color: "#fff", height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: #535353; border-radius: 3px; }
        .nav-item { display:flex; align-items:center; gap:12px; padding:8px 12px; border-radius:6px; cursor:pointer; color:#b3b3b3; font-size:14px; font-weight:600; transition:color 0.15s; }
        .nav-item:hover, .nav-item.active { color:#fff; }
        .nav-item.active { background:#282828; }
        .track-row { display:grid; grid-template-columns:16px 4fr 3fr 2fr 40px; gap:16px; align-items:center; padding:8px 16px; border-radius:4px; cursor:pointer; transition:background 0.15s; }
        .track-row:hover { background:#ffffff12; }
        .track-row:hover .play-on-hover { opacity:1; }
        .track-row:hover .track-num { opacity:0; }
        .play-on-hover { position:absolute; opacity:0; transition:opacity 0.15s; }
        .track-num { transition:opacity 0.15s; }
        .ctrl-btn { background:none; border:none; color:#b3b3b3; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:color 0.15s, transform 0.1s; padding:4px; border-radius:50%; }
        .ctrl-btn:hover { color:#fff; transform:scale(1.05); }
        .ctrl-btn.active { color:#1db954; }
        .main-play-btn { background:#fff; border:none; border-radius:50%; width:56px; height:56px; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:transform 0.1s, background 0.15s; color:#000; }
        .main-play-btn:hover { transform:scale(1.06); background:#f0f0f0; }
        .slider-bar { height:4px; border-radius:2px; background:#535353; cursor:pointer; position:relative; }
        .slider-fill { height:100%; border-radius:2px; background:#fff; pointer-events:none; }
        .slider-bar:hover .slider-fill { background:#1db954; }
        .slider-bar::after { content:''; position:absolute; right:0; top:50%; transform:translate(50%,-50%) scale(0); width:12px; height:12px; border-radius:50%; background:#fff; transition:transform 0.15s; }
        .slider-bar:hover::after { transform:translate(50%,-50%) scale(1); }
        .like-btn { background:none; border:none; cursor:pointer; color:#b3b3b3; display:flex; align-items:center; transition:color 0.15s, transform 0.1s; }
        .like-btn:hover { color:#fff; }
        .like-btn.liked { color:#1db954; }
        .pl-card { background:#181818; border-radius:8px; padding:16px; cursor:pointer; transition:background 0.2s; }
        .pl-card:hover { background:#282828; }
        .play-overlay { position:absolute; bottom:12px; right:12px; background:#1db954; border:none; border-radius:50%; width:48px; height:48px; display:flex; align-items:center; justify-content:center; cursor:pointer; opacity:0; transform:translateY(8px); transition:opacity 0.2s, transform 0.2s; color:#000; }
        .pl-card:hover .play-overlay { opacity:1; transform:translateY(0); }
      `}</style>

      {/* Main Layout */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden", gap: 8, padding: "8px 8px 0" }}>
        
        {/* Sidebar */}
        <div style={{ width: 240, background: "#121212", borderRadius: 8, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ padding: "16px 12px 8px" }}>
            <div className={`nav-item ${activeView === "home" ? "active" : ""}`} onClick={() => setActiveView("home")}>
              <Icon name="home" size={24} /><span>Home</span>
            </div>
            <div className={`nav-item ${activeView === "search" ? "active" : ""}`} onClick={() => setActiveView("search")}>
              <Icon name="search" size={24} /><span>Search</span>
            </div>
          </div>

          <div style={{ flex: 1, background: "#121212", borderRadius: 8, margin: "0 0 0 0", overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "16px 16px 8px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#b3b3b3", fontWeight: 700, fontSize: 14 }}>
                <Icon name="library" size={24} />Your Library
              </div>
              <button className="ctrl-btn"><Icon name="plus" size={20} /></button>
            </div>

            <div style={{ overflowY: "auto", flex: 1, padding: "0 8px" }}>
              {/* Liked Songs */}
              <div className="nav-item" style={{ marginBottom: 4 }} onClick={() => { setActiveView("liked"); setQueue(tracks.filter(t => liked.has(t.id))); }}>
                <div style={{ width: 40, height: 40, background: "linear-gradient(135deg,#450af5,#c4efd9)", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon name="heart" size={16} />
                </div>
                <div><div style={{ fontSize: 13, color: "#fff" }}>Liked Songs</div><div style={{ fontSize: 11, color: "#b3b3b3" }}>Playlist · {liked.size} songs</div></div>
              </div>
              {playlists.map(pl => (
                <div key={pl.id} className="nav-item" style={{ marginBottom: 4 }} onClick={() => openPlaylist(pl)}>
                  <img src={pl.cover} alt={pl.name} style={{ width: 40, height: 40, borderRadius: 4, objectFit: "cover", flexShrink: 0 }} />
                  <div><div style={{ fontSize: 13, color: "#fff" }}>{pl.name}</div><div style={{ fontSize: 11, color: "#b3b3b3" }}>Playlist · {pl.tracks.length} songs</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, background: "#121212", borderRadius: 8, overflowY: "auto", display: "flex", flexDirection: "column" }}>
          {/* Header gradient */}
          <div style={{ background: "linear-gradient(180deg, #1e3a5f 0%, #121212 100%)", padding: "32px 32px 16px" }}>
            <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 4 }}>
              {activeView === "home" ? "Good evening" : activeView === "playlist" && activePlaylist ? activePlaylist.name : activeView === "liked" ? "Liked Songs" : "Search"}
            </h1>
            {activeView === "playlist" && activePlaylist && (
              <p style={{ color: "#b3b3b3", fontSize: 14 }}>{activePlaylist.tracks.length} songs</p>
            )}
          </div>

          <div style={{ padding: "0 32px 32px" }}>
            {/* Playlists Grid (Home) */}
            {activeView === "home" && (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 16, marginBottom: 40 }}>
                  {playlists.map(pl => (
                    <div key={pl.id} className="pl-card" onClick={() => openPlaylist(pl)} style={{ position: "relative" }}>
                      <img src={pl.cover} alt={pl.name} style={{ width: "100%", aspectRatio: "1", borderRadius: 6, objectFit: "cover", marginBottom: 12 }} />
                      <button className="play-overlay" onClick={e => { e.stopPropagation(); openPlaylist(pl); setIsPlaying(true); }}>
                        <Icon name="play" size={22} />
                      </button>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{pl.name}</div>
                      <div style={{ color: "#b3b3b3", fontSize: 12, marginTop: 4 }}>{pl.tracks.length} songs</div>
                    </div>
                  ))}
                </div>
                <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>All Songs</h2>
              </>
            )}

            {/* Track List Header */}
            {activeView !== "search" && (
              <div style={{ display: "grid", gridTemplateColumns: "16px 4fr 3fr 2fr 40px", gap: 16, padding: "0 16px 8px", borderBottom: "1px solid #282828", marginBottom: 8 }}>
                <span style={{ color: "#b3b3b3", fontSize: 12 }}>#</span>
                <span style={{ color: "#b3b3b3", fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>Title</span>
                <span style={{ color: "#b3b3b3", fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>Album</span>
                <span style={{ color: "#b3b3b3", fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>Duration</span>
                <span></span>
              </div>
            )}

            {/* Track Rows */}
            {activeView !== "search" && displayTracks.map((track, i) => (
              <div key={track.id} className="track-row" onDoubleClick={() => playTrack(track)}>
                <div style={{ position: "relative", width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span className="track-num" style={{ fontSize: 14, color: currentTrack.id === track.id ? "#1db954" : "#b3b3b3" }}>
                    {currentTrack.id === track.id && isPlaying ? "♫" : i + 1}
                  </span>
                  <button className="play-on-hover ctrl-btn" onClick={() => playTrack(track)} style={{ position: "absolute" }}>
                    <Icon name={currentTrack.id === track.id && isPlaying ? "pause" : "play"} size={14} />
                  </button>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                  <img src={track.cover} alt={track.title} style={{ width: 40, height: 40, borderRadius: 4, objectFit: "cover", flexShrink: 0 }} />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: currentTrack.id === track.id ? "#1db954" : "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{track.title}</div>
                    <div style={{ color: "#b3b3b3", fontSize: 12 }}>{track.artist}</div>
                  </div>
                </div>
                <div style={{ color: "#b3b3b3", fontSize: 14, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{track.album}</div>
                <div style={{ color: "#b3b3b3", fontSize: 14 }}>{formatTime(track.duration)}</div>
                <button className={`like-btn ${liked.has(track.id) ? "liked" : ""}`} onClick={() => toggleLike(track.id)}>
                  <Icon name="heart" size={16} />
                </button>
              </div>
            ))}

            {activeView === "search" && (
              <div style={{ textAlign: "center", paddingTop: 80, color: "#b3b3b3" }}>
                <Icon name="search" size={64} />
                <p style={{ marginTop: 16, fontSize: 18 }}>Search for your favorite music</p>
                <p style={{ fontSize: 14, marginTop: 8 }}>Browse genres, artists, and more</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Player Bar */}
      <div style={{ height: 90, background: "#181818", borderTop: "1px solid #282828", display: "flex", alignItems: "center", padding: "0 16px", gap: 16, flexShrink: 0 }}>
        
        {/* Now Playing */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, width: 240, minWidth: 0 }}>
          <img src={currentTrack.cover} alt={currentTrack.title} style={{ width: 56, height: 56, borderRadius: 4, objectFit: "cover", flexShrink: 0 }} />
          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 600, fontSize: 14, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{currentTrack.title}</div>
            <div style={{ color: "#b3b3b3", fontSize: 12 }}>{currentTrack.artist}</div>
          </div>
          <button className={`like-btn ${liked.has(currentTrack.id) ? "liked" : ""}`} onClick={() => toggleLike(currentTrack.id)} style={{ marginLeft: 8, flexShrink: 0 }}>
            <Icon name="heart" size={16} />
          </button>
        </div>

        {/* Controls */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button className={`ctrl-btn ${isShuffle ? "active" : ""}`} onClick={() => setIsShuffle(!isShuffle)}><Icon name="shuffle" size={18} /></button>
            <button className="ctrl-btn" onClick={handlePrev}><Icon name="skip_prev" size={22} /></button>
            <button className="main-play-btn" onClick={() => setIsPlaying(!isPlaying)}>
              <Icon name={isPlaying ? "pause" : "play"} size={26} />
            </button>
            <button className="ctrl-btn" onClick={handleNext}><Icon name="skip_next" size={22} /></button>
            <button className={`ctrl-btn ${isRepeat ? "active" : ""}`} onClick={() => setIsRepeat(!isRepeat)}><Icon name="repeat" size={18} /></button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", maxWidth: 520 }}>
            <span style={{ color: "#b3b3b3", fontSize: 11, width: 32, textAlign: "right" }}>{formatTime(elapsed)}</span>
            <div className="slider-bar" style={{ flex: 1 }} onClick={handleSeek}>
              <div className="slider-fill" style={{ width: `${progress}%` }} />
            </div>
            <span style={{ color: "#b3b3b3", fontSize: 11, width: 32 }}>{formatTime(currentTrack.duration)}</span>
          </div>
        </div>

        {/* Volume */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, width: 200, justifyContent: "flex-end" }}>
          <button className="ctrl-btn" onClick={() => setIsMuted(!isMuted)}>
            <Icon name={isMuted || volume === 0 ? "mute" : "volume"} size={20} />
          </button>
          <div className="slider-bar" style={{ width: 100 }} onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); setVolume(Math.round(((e.clientX-r.left)/r.width)*100)); setIsMuted(false); }}>
            <div className="slider-fill" style={{ width: `${isMuted ? 0 : volume}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}