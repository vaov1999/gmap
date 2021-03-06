export const categoriesOrganization = {
  health: { name: 'Health', icon: 'mdi-heart' },
  food: { name: 'Food', icon: 'mdi-food' },
  education: { name: 'Education', icon: 'mdi-school' },
  housing: { name: 'Housing', icon: 'mdi-home' },
  other: { name: 'Other', icon: 'mdi-clover' },
}

export const googleMapThemeDark = [
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  {
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#242f3e' }],
  },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#263c3f' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6b9a76' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#38414e' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#212a37' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9ca5b3' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#746855' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1f2835' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#f3d19c' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#2f3948' }],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#17263c' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#515c6d' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#17263c' }],
  },
]

export const googleMapThemeLight = [
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
]

export const routesMenu = [
  {
    icon: 'mdi-home',
    title: 'Home',
    to: '/',
  },
  {
    icon: 'mdi-youtube',
    title: 'Watch Tutorial',
    to: '/watch-tutorial',
  },
  {
    icon: 'mdi-information-variant',
    title: 'info',
    to: '/Legal-disclaimer',
  },
  {
    icon: 'mdi-plus-circle-outline',
    title: 'listening',
    to: '/add-a-listing',
  },
  {
    icon: 'mdi-information-outline',
    title: 'Learn More',
    to: '/learn-more',
  },
  {
    icon: 'mdi-login-variant',
    title: 'Sign Up',
    to: '/sign-up',
  },
  {
    icon: 'mdi-login',
    title: 'Log In',
    to: '/log-in',
  },
]
