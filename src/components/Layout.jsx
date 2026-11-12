import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
export default function Layout() {
  const { user, logout } = useAuth(); const navigate = useNavigate();
  async function handleLogout() { try { await logout(); navigate("/", { replace: true }); } catch {} }
  return <><header><Link className="logo" to="/">Product<span>Hub</span></Link><nav>{[["/","Home"],["/products","Products"],["/about","About"],["/dashboard","Dashboard"]].map(([to,t])=><NavLink end={to==="/"} key={to} to={to}>{t}</NavLink>)}{user ? <><NavLink to="/profile">Profile</NavLink><button className="nav-button" onClick={handleLogout}>Logout</button></> : <><NavLink to="/login">Login</NavLink><NavLink to="/signup">Signup</NavLink></>}</nav></header><main><Outlet/></main><footer>© 2026 ProductHub · Server Data, Caching & Firebase Authentication</footer></>;
}
