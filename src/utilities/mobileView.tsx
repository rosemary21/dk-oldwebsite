

export default function mobileView() {
  if (window.matchMedia("(max-width: 576px)").matches) {
    return true;
  } else {
    return false;
  }
}
