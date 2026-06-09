/* ============================================================
   Icons — minimal stroke set (lucide-style, 24x24)
   ============================================================ */
const _ic = (paths, opts = {}) => (props) => {
  const { size = 20, className = '', strokeWidth = 1.75, ...rest } = props || {};
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true" {...rest}>
      {paths}
    </svg>
  );
};

const IconSparkles = _ic(<>
  <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z" />
  <path d="M19 14l.7 1.9L21.6 16.6 19.7 17.3 19 19.2 18.3 17.3 16.4 16.6 18.3 15.9z" />
</>);
const IconArrowRight = _ic(<><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></>);
const IconArrowLeft = _ic(<><path d="M19 12H5" /><path d="M11 6l-6 6 6 6" /></>);
const IconChevronDown = _ic(<path d="M6 9l6 6 6-6" />);
const IconChevronRight = _ic(<path d="M9 6l6 6-6 6" />);
const IconChevronLeft = _ic(<path d="M15 18l-6-6 6-6" />);
const IconCheck = _ic(<path d="M5 12.5l4.5 4.5L19 7" />);
const IconCheckCircle = _ic(<><circle cx="12" cy="12" r="9" /><path d="M8.5 12.5l2.5 2.5 4.5-5" /></>);
const IconShield = _ic(<><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /><path d="M9 12l2 2 4-4" /></>);
const IconArrowUp = _ic(<><path d="M12 19V5" /><path d="M6 11l6-6 6 6" /></>);
const IconCopy = _ic(<><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></>);
const IconSpeaker = _ic(<><path d="M5 9v6h4l5 4V5L9 9z" /><path d="M17 8a5 5 0 0 1 0 8" /><path d="M19.5 5.5a9 9 0 0 1 0 13" /></>);
const IconRefresh = _ic(<><path d="M3 12a9 9 0 0 1 15-6.7L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-15 6.7L3 16" /><path d="M3 21v-5h5" /></>);
const IconFlag = _ic(<><path d="M5 21V4" /><path d="M5 4h11l-2 4 2 4H5" /></>);
const IconInfo = _ic(<><circle cx="12" cy="12" r="9" /><path d="M12 11v5" /><path d="M12 7.5h.01" /></>);
const IconTranslate = _ic(<><path d="M4 6h10" /><path d="M9 4v2c0 4-2 7-5 9" /><path d="M6 11c1.5 2.5 4 4 7 5" /><path d="M13 20l4-9 4 9" /><path d="M14.5 17h5" /></>);
const IconUser = _ic(<><circle cx="12" cy="8" r="3.5" /><path d="M5 20c1.2-3.6 4-5 7-5s5.8 1.4 7 5" /></>);
const IconGrid = _ic(<><rect x="4" y="4" width="7" height="7" rx="1.4" /><rect x="13" y="4" width="7" height="7" rx="1.4" /><rect x="4" y="13" width="7" height="7" rx="1.4" /><rect x="13" y="13" width="7" height="7" rx="1.4" /></>);
const IconMenu = _ic(<><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>);
const IconClose = _ic(<><path d="M6 6l12 12" /><path d="M18 6L6 18" /></>);
const IconMapPin = _ic(<><path d="M12 21c4-4 7-7.5 7-11a7 7 0 1 0-14 0c0 3.5 3 7 7 11z" /><circle cx="12" cy="10" r="2.5" /></>);
const IconLeaf = _ic(<><path d="M5 19c0-8 6-13 14-13 0 8-5 14-13 14-1 0-1-1-1-1z" /><path d="M5 19c3-4 6-6 10-7" /></>);
const IconTractor = _ic(<><circle cx="7" cy="17" r="3" /><circle cx="18" cy="18" r="2" /><path d="M4 17V8h6l2 5h4" /><path d="M10 8V5h3l2 3" /></>);
const IconBolt = _ic(<path d="M13 3L5 14h6l-1 7 8-11h-6z" />);
const IconScale = _ic(<><path d="M12 4v16" /><path d="M7 8h10" /><path d="M7 8l-3 6a3 3 0 0 0 6 0z" /><path d="M17 8l3 6a3 3 0 0 1-6 0z" /><path d="M8 20h8" /></>);
const IconChart = _ic(<><path d="M4 4v16h16" /><rect x="7" y="11" width="3" height="6" rx="0.5" /><rect x="12" y="7" width="3" height="10" rx="0.5" /><rect x="17" y="13" width="3" height="4" rx="0.5" /></>);
const IconClock = _ic(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>);
const IconCalendar = _ic(<><rect x="4" y="5" width="16" height="16" rx="2" /><path d="M4 9h16" /><path d="M8 3v4" /><path d="M16 3v4" /></>);
const IconBuilding = _ic(<><rect x="5" y="3" width="14" height="18" rx="1.5" /><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" /></>);
const IconFilter = _ic(<path d="M4 5h16l-6 7v6l-4-2v-4z" />);
const IconBook = _ic(<><path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 0-3 3z" /><path d="M5 4v16" /></>);
const IconLink = _ic(<><path d="M10 14a4 4 0 0 0 5.6 0l2.4-2.4a4 4 0 0 0-5.6-5.6L11 7.4" /><path d="M14 10a4 4 0 0 0-5.6 0L6 12.4a4 4 0 0 0 5.6 5.6L13 16.6" /></>);
const IconLock = _ic(<><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>);
const IconBell = _ic(<><path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6z" /><path d="M10 19a2 2 0 0 0 4 0" /></>);
const IconList = _ic(<><circle cx="5" cy="7" r="1" /><circle cx="5" cy="12" r="1" /><circle cx="5" cy="17" r="1" /><path d="M9 7h11M9 12h11M9 17h11" /></>);
const IconExternal = _ic(<><path d="M14 5h5v5" /><path d="M19 5l-8 8" /><path d="M18 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></>);
const IconChat = _ic(<path d="M5 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-4 4z" />);
const IconFile = _ic(<><path d="M14 3v5h5" /><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M9 13h6M9 17h4" /></>);
const IconPlay = _ic(<><circle cx="12" cy="12" r="9" /><path d="M10 9l5 3-5 3z" fill="currentColor" stroke="none" /></>);
const IconPhone = _ic(<path d="M6 3h3l2 5-2 1.5a11 11 0 0 0 5 5L15 12l5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 4 5a2 2 0 0 1 2-2z" />);
const IconTickDouble = _ic(<><path d="M2 12.5l4 4L13 8" /><path d="M9.5 14.5L11 16l7-8.5" /></>);
const IconBank = _ic(<><path d="M4 10l8-5 8 5" /><path d="M5 10v8M9 10v8M15 10v8M19 10v8" /><path d="M3 21h18" /></>);
const IconVideo = _ic(<><rect x="3" y="6" width="13" height="12" rx="2" /><path d="M16 10l5-3v10l-5-3z" /></>);

Object.assign(window, {
  IconSparkles, IconArrowRight, IconArrowLeft, IconChevronDown, IconChevronRight, IconChevronLeft, IconCheck, IconCheckCircle,
  IconShield, IconArrowUp, IconCopy, IconSpeaker, IconRefresh, IconFlag, IconInfo, IconTranslate, IconUser,
  IconGrid, IconMenu, IconClose, IconMapPin, IconLeaf, IconTractor, IconBolt, IconScale, IconChart, IconClock,
  IconCalendar, IconBuilding, IconFilter, IconBook, IconLink, IconLock, IconBell, IconList, IconExternal,
  IconChat, IconFile, IconPlay, IconPhone, IconTickDouble, IconBank, IconVideo,
});
