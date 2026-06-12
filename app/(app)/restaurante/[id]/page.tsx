"use client";
import { useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft, Heart, Star, MapPin, Phone, Globe,
  Shield, AlertTriangle, MessageCircle, CheckCircle,
  Clock, Mail, Lock, Flag, UtensilsCrossed, BadgeCheck,
} from "lucide-react";
import SafetyBadge from "@/components/SafetyBadge";
import Tag from "@/components/Tag";
import { mockRestaurants, localizeRestaurant, localizeSafetyLevelConfig, RESTAURANT_LOGOS } from "@/lib/data";
import { getRestrictionColor } from "@/lib/tags";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

function IconEstrela({ size = 12, fill = "#FFC24D" }: { size?: number; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" fill={fill}/>
    </svg>
  );
}

function IconInstagram({ size = 13, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function RestaurantePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { t, language } = useLanguage();
  const restaurant = localizeRestaurant(mockRestaurants.find((r) => r.id === id) ?? mockRestaurants[0], language);
  const dishesWithPhoto = restaurant.dishes.filter((dish) => !!dish.image);

  const [isFav, setIsFav] = useState(restaurant.isFavorite);
  const [activeTab, setActiveTab] = useState<"sobre" | "pratos" | "avaliacoes">("sobre");
  const [reportDishId, setReportDishId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("pizza");

  // ── Ícones SVG inline das categorias ─────────────────────────────────────
  const IconPizza = () => (
    <svg viewBox="0 0 511.999 511.999" width="18" height="18" fill="currentColor">
      <path d="M387.428,337.889c-2.841-7.201-5.896-14.333-9.193-21.381c-18.182-38.887-43.293-75.311-75.358-107.378c-32.068-32.069-68.492-57.179-107.382-75.362c-7.05-3.297-14.184-6.352-21.383-9.191c-7.242-2.858-14.55-5.497-21.923-7.891L1.775,479.821c-3.603,8.696-1.61,18.705,5.045,25.362c4.451,4.451,10.404,6.816,16.46,6.816c2.999,0,6.023-0.579,8.901-1.773L395.319,359.81C392.923,352.44,390.284,345.131,387.428,337.889z M159.834,352.172c-15.329,15.327-39.559,16.322-56.045,2.991c-1.148-0.928-2.262-1.924-3.33-2.991c-6.2-6.2-10.051-13.858-11.563-21.87c-2.485-13.174,1.367-27.309,11.563-37.506c1.888-1.888,3.917-3.548,6.045-5.004c8.391-5.73,18.395-8.082,28.11-7.048c9.211,0.982,18.159,4.994,25.22,12.052C176.224,309.193,176.224,335.774,159.834,352.172z M201.395,227.485c16.393-16.393,42.978-16.393,59.373,0.003c16.393,16.393,16.393,42.978,0,59.373c-16.393,16.393-42.978,16.393-59.373,0C184.998,270.466,185.001,243.882,201.395,227.485z M290.057,378.222c-1.567,7.857-5.388,15.354-11.478,21.445c-14.399,14.403-36.66,16.148-52.973,5.252c-2.259-1.51-4.406-3.258-6.4-5.252c-4.003-4-7.021-8.612-9.069-13.531c-6.344-15.236-3.325-33.452,9.069-45.842c16.393-16.393,42.978-16.393,59.373,0c4.048,4.049,7.093,8.722,9.141,13.707C290.886,361.701,291.665,370.152,290.057,378.222z"/>
      <path d="M510.225,287.028c-26.194-63.236-63.726-119.914-111.554-168.458C349.143,68.296,290.704,29.002,224.977,1.779c-11.872-4.921-25.49,0.718-30.408,12.594l-24.424,58.966c7.368,2.467,14.655,5.148,21.868,8.018c7.21,2.867,14.341,5.93,21.383,9.194c44.934,20.821,86.331,49.606,122.393,85.666c36.061,36.063,64.843,77.457,85.664,122.393c3.263,7.038,6.327,14.168,9.193,21.377c2.87,7.214,5.551,14.503,8.018,21.87l58.966-24.424c5.703-2.363,10.234-6.893,12.595-12.594C512.587,299.136,512.587,292.726,510.225,287.028z"/>
    </svg>
  );

  const IconHamburguer = () => (
    <svg viewBox="0 0 512 512" width="18" height="18" fill="currentColor">
      <path d="M469.342,397.667H44.654c-24.653,0-33.28,19.993-33.28,44.654v4.451c0,24.669,19.993,44.654,44.646,44.654h401.846c24.653,0,44.646-19.984,44.646-44.654v-4.451C502.513,417.66,494.012,397.667,469.342,397.667z"/>
      <path d="M447.177,373.682c22.891,0,41.448-14.765,41.448-33.004v-0.96c0-18.223-18.556-33.004-41.448-33.004H74.193c-22.882,0-41.439,14.782-41.439,33.004v0.96c0,18.239,18.556,33.004,41.439,33.004H447.177z"/>
      <path d="M41.672,205.52h430.534c16.376,0,25.83-8.936,25.83-25.906c0-5.787-0.518-3.156-1.478-8.878C483.338,91.593,381.127,20.574,256.952,20.574c-124.192,0-226.403,71.02-239.623,150.164h-0.008c-0.96,5.721-1.479,3.091-1.479,8.878C15.842,196.585,25.296,205.52,41.672,205.52z"/>
      <path d="M497.126,231.727c-5.244-0.008-10.213,0.793-14.706,2.288c-3.934,1.302-7.466,3.115-10.539,5.161c-5.378,3.582-9.37,7.749-12.686,11.508c-2.488,2.814-4.619,5.445-6.573,7.658c-2.914,3.357-5.394,5.67-7.616,7.006c-1.127,0.652-2.188,1.144-3.449,1.503c-1.262,0.351-2.748,0.585-4.727,0.593c-2.297-0.008-3.925-0.317-5.32-0.776c-1.219-0.401-2.297-0.952-3.457-1.712c-2.005-1.311-4.251-3.449-6.824-6.389c-1.937-2.188-4.05-4.793-6.505-7.616c-3.691-4.176-8.217-8.953-14.598-12.819c-3.174-1.929-6.799-3.574-10.791-4.702c-3.975-1.12-8.284-1.712-12.794-1.704c-5.236-0.008-10.205,0.793-14.698,2.288c-3.934,1.302-7.466,3.115-10.539,5.161c-5.386,3.582-9.37,7.749-12.686,11.508c-2.497,2.814-4.619,5.445-6.573,7.658c-2.923,3.357-5.387,5.67-7.616,7.006c-1.127,0.652-2.188,1.144-3.449,1.503c-1.253,0.351-2.739,0.585-4.719,0.593c-2.305-0.008-3.926-0.317-5.32-0.776c-1.227-0.401-2.304-0.952-3.465-1.712c-1.996-1.311-4.234-3.449-6.815-6.389c-1.938-2.188-4.042-4.793-6.505-7.599c-3.692-4.193-8.218-8.97-14.59-12.836c-3.182-1.929-6.798-3.574-10.79-4.702c-3.976-1.12-8.293-1.712-12.794-1.704c-5.236-0.008-10.206,0.793-14.69,2.288c-3.933,1.302-7.474,3.115-10.548,5.161c-5.387,3.582-9.37,7.749-12.694,11.508c-2.48,2.814-4.601,5.445-6.556,7.658c-2.923,3.357-5.403,5.67-7.625,7.006c-1.118,0.652-2.179,1.144-3.44,1.503c-1.278,0.351-2.748,0.585-4.727,0.593c-2.306-0.008-3.925-0.317-5.328-0.776c-1.211-0.401-2.296-0.952-3.44-1.712c-2.013-1.311-4.242-3.449-6.832-6.389c-1.937-2.188-4.042-4.793-6.505-7.599c-3.683-4.193-8.218-8.97-14.59-12.836c-3.173-1.929-6.806-3.574-10.781-4.702c-3.984-1.12-8.293-1.712-12.803-1.704c-5.236-0.008-10.196,0.793-14.698,2.288c-3.934,1.302-7.458,3.115-10.531,5.161c-5.386,3.582-9.37,7.749-12.693,11.508c-2.49,2.814-4.61,5.445-6.556,7.658c-2.923,3.357-5.404,5.67-7.617,7.006c-1.127,0.652-2.196,1.144-3.458,1.503c-1.26,0.351-2.739,0.585-4.718,0.593c-2.305-0.008-3.925-0.317-5.32-0.776c-1.22-0.401-2.296-0.952-3.449-1.712c-2.004-1.311-4.251-3.44-6.824-6.389c-1.937-2.188-4.042-4.793-6.505-7.599c-3.691-4.193-8.217-8.952-14.59-12.836c-3.173-1.929-6.798-3.574-10.781-4.702c-3.983-1.12-8.292-1.712-12.803-1.704C6.664,231.727,0,238.392,0,246.609c0,8.218,6.664,14.882,14.882,14.882c2.306,0,3.925,0.318,5.32,0.777c1.22,0.409,2.297,0.943,3.449,1.712c2.005,1.32,4.243,3.44,6.824,6.38c1.937,2.188,4.042,4.81,6.505,7.616c3.692,4.184,8.218,8.953,14.59,12.836c3.174,1.928,6.806,3.565,10.781,4.684c3.976,1.12,8.293,1.712,12.803,1.712c5.228,0.009,10.197-0.794,14.69-2.288c3.933-1.311,7.466-3.114,10.531-5.152c5.395-3.591,9.378-7.766,12.703-11.508c2.48-2.831,4.609-5.453,6.556-7.675c2.931-3.349,5.394-5.662,7.616-6.99c1.127-0.668,2.188-1.152,3.458-1.511c1.253-0.35,2.73-0.593,4.718-0.593c2.306,0,3.925,0.318,5.32,0.777c1.22,0.409,2.297,0.943,3.458,1.712c2.004,1.32,4.242,3.44,6.815,6.38c1.937,2.188,4.05,4.81,6.505,7.616c3.7,4.184,8.218,8.953,14.598,12.836c3.173,1.928,6.798,3.565,10.781,4.684c3.984,1.12,8.293,1.712,12.803,1.712c5.228,0.009,10.205-0.794,14.689-2.288c3.934-1.311,7.467-3.114,10.54-5.152c5.386-3.591,9.37-7.766,12.686-11.508c2.496-2.831,4.618-5.453,6.572-7.675c2.923-3.349,5.395-5.662,7.616-6.99c1.119-0.668,2.188-1.152,3.45-1.511c1.26-0.35,2.739-0.593,4.726-0.593c2.305,0,3.917,0.318,5.312,0.777c1.227,0.409,2.305,0.943,3.458,1.712c2.004,1.32,4.242,3.44,6.822,6.38c1.946,2.188,4.051,4.81,6.506,7.616c3.691,4.184,8.218,8.953,14.598,12.836c3.174,1.928,6.798,3.565,10.781,4.684c3.984,1.12,8.293,1.712,12.803,1.712c5.228,0.009,10.197-0.794,14.69-2.288c3.934-1.311,7.466-3.114,10.539-5.152c5.386-3.591,9.378-7.766,12.686-11.508c2.488-2.831,4.619-5.453,6.564-7.675c2.923-3.349,5.403-5.662,7.633-6.99c1.102-0.668,2.18-1.152,3.44-1.511c1.262-0.35,2.739-0.593,4.727-0.593c2.297,0,3.918,0.318,5.32,0.777c1.219,0.409,2.304,0.943,3.449,1.712c2.013,1.32,4.242,3.44,6.832,6.38c1.937,2.188,4.05,4.81,6.514,7.616c3.682,4.192,8.218,8.953,14.589,12.836c3.174,1.928,6.799,3.565,10.782,4.684c3.984,1.127,8.293,1.721,12.803,1.721c5.236,0,10.214-0.802,14.689-2.297c3.934-1.302,7.467-3.114,10.539-5.152c5.395-3.591,9.387-7.766,12.694-11.508c2.481-2.823,4.619-5.445,6.564-7.675c2.923-3.349,5.396-5.662,7.625-6.99c1.111-0.668,2.18-1.152,3.449-1.502c1.27-0.359,2.739-0.602,4.735-0.602c8.21,0,14.874-6.664,14.874-14.882C512,238.392,505.336,231.727,497.126,231.727z"/>
    </svg>
  );

  const IconJaponesa = () => (
    <svg viewBox="0 0 349.908 349.909" width="18" height="18" fill="currentColor">
      <path d="M326.028,223.54c-0.003,0-0.004,0-0.006,0c-2.593,0-5.322-0.167-8.184-0.469c-0.689-0.073-2.119-0.133-2.789,1.02c-9.573,17.916-25.66,28.549-44.773,28.549H79.634c-19.113,0-35.376-10.945-44.952-28.862c-0.523-0.859-1.586-0.816-2.116-0.758c-3.04,0.334-5.939,0.521-8.679,0.521c-1.778,0-3.468-0.084-5.076-0.243c-1.772-0.176-3.902,0.026-3.902,1.276c7.296,29.128,28.768,48.297,55.521,48.297h209.052c26.754,0,48.83-19.293,56.128-48.418c0.299-1.623-1.234-1.59-2.142-1.453C331.142,223.352,328.669,223.539,326.028,223.54z"/>
      <path d="M63.607,103.295c-0.885-1.536-2.331-0.822-3.172-0.379C23.418,122.362,0,151.065,0,183.088c0,40.992,38.373,24.607,94.527,11.078c0.81-0.195,2.174-1.136,1.543-3.013L63.607,103.295z"/>
      <path d="M189.025,79.281v102.75c0,1.375,0.95,1.518,1.429,1.547c21.702,1.337,42.266,5.261,60.967,9.646c0.854,0.2,2.531,0.475,3.264-0.95l38.895-84.686c0.791-1.475-0.404-2.672-1.06-3.032C265.257,89.551,230.154,79.688,191.371,77.5C190.589,77.456,189.025,77.499,189.025,79.281z"/>
      <path d="M176.025,79.031c0-1.653-2.019-1.995-2.491-1.993c-35.705,0.172-68.853,6.832-96.416,18.124c-0.772,0.316-2.084,1.348-1.514,3.095l33.604,90.945c0.701,1.537,2.251,1.143,2.912,1.004c19.247-4.002,40.406-7.072,62.239-7.182c0.41-0.002,1.667,0.006,1.667-1.119L176.025,79.031z"/>
      <path d="M304.505,114.94c-10.647,19.907-37.227,81.003-37.227,81.003c-0.41,0.919,0.555,1.319,1.061,1.449c49.018,12.528,81.569,23.448,81.569-14.307c0-26.411-15.936-50.561-42.28-69.125C306.958,113.493,305.327,113.406,304.505,114.94z"/>
    </svg>
  );

  const IconMexicana = () => (
    <svg viewBox="0 0 576.943 576.944" width="18" height="18" fill="currentColor">
      <path d="M576.943,346.325c0-24.519-50.785-46.13-127.945-58.829l-19.537,14.708c48.76,8.013,79.818,20.109,79.818,33.631c0,5.565-5.307,10.882-14.889,15.778c-31.977,16.342-112.082,27.932-205.909,27.932c-93.828,0-173.942-11.589-205.919-27.932c-9.582-4.896-14.889-10.213-14.889-15.778c0-11.207,21.353-21.43,56.409-29.165l-15.415-15.692C42.467,303.954,0.01,323.919,0.01,346.325c0,1.778,0.354,3.538,0.889,5.288H0l1.377,1.578c2.132,5.44,6.828,10.7,13.693,15.711l84.934,97.461h-3.978c-12.546,0-22.711,10.165-22.711,22.711v2.391c0,12.546,10.165,22.711,22.711,22.711H490.48c12.545,0,22.711-10.165,22.711-22.711v-2.391c0-12.546-10.166-22.711-22.711-22.711h-13.531l84.924-97.461c6.867-5.011,11.553-10.271,13.684-15.711l1.387-1.578h-0.889C576.58,349.863,576.943,348.103,576.943,346.325z"/>
      <path d="M364.197,294.764l2.553,30.705l35.928-27.053l19.67-14.812l143.389-107.961L344.871,62.768l3.768,45.202l94.238,21.478c3.281,0.746,5.93,3.175,6.973,6.369c1.031,3.203,0.314,6.722-1.895,9.247l-87.859,100.444l2.695,32.397L364.197,294.764z"/>
      <path d="M233.899,293.473l17.356,47.41l42.62-48.73l14.391-16.447l32.092-36.691l8.76-10.012l8.76-10.012l65.121-74.454l-72.705-16.572l-9.781-2.228l-9.783-2.228l-79.541-18.13L213.569,238.01l14.315,39.082L233.899,293.473z"/>
      <path d="M224.05,99.191l-55.338,16.266l-9.189,2.706l-9.199,2.706L9.094,162.38l122.41,124.552l15.147,15.415l22.367,22.759l7.64-26.947l4.992-17.595l11.848-41.788l4.446-15.673l4.447-15.664l30.15-106.306l1.368-4.829L224.05,99.191z"/>
    </svg>
  );

  const IconChurrasco = () => (
    <svg viewBox="0 0 512 512" width="18" height="18" fill="currentColor">
      <path d="M511.903,253.069c-1.554-48.548-44.376-84.942-104.409-88.656c-120.864-7.486-109.509-67.345-209.663-73.722c-5.642-0.361-11.207-0.536-16.662-0.536c-102.294,0-171.103,61.839-180.098,137.418c-0.548,4.591-0.839,9.124-0.968,13.612H0v52.824h0.31c3.218,66.926,53.423,119.234,135.051,121.51c48.123,1.342,182.039,5.082,224.552,6.268c69.628,1.94,136.721-44.738,149.856-104.255c0.87-3.94,1.418-7.815,1.767-11.639H512v-52.824H511.903z"/>
      <path d="M297.455,186.182L192.898,324.805l66.236,1.844l91.552-121.381C328.691,200.426,311.661,193.584,297.455,186.182z"/>
      <path d="M265.04,166.244c-17.926-12.136-30.519-20.634-56.144-23.968L85.284,306.17c14.644,10.652,33.898,16.572,56.686,17.21l13.128,0.368l115.81-153.558C268.915,168.862,266.956,167.54,265.04,166.244z"/>
      <path d="M56.273,233.125c-2.166,18.228,0.767,35.265,8.267,49.367l106.498-141.202C108.716,145.893,62.322,182.351,56.273,233.125z"/>
      <path d="M398.015,211.639c-4.398-0.271-8.641-0.619-12.768-1.019L296.94,327.707l59.472,1.657c0.961,0.019,1.922,0.038,2.882,0.038c44.286,0,88.27-29.771,96.046-65.03c2.528-11.465,0.594-21.556-5.764-29.99C439.748,221.351,420.951,213.058,398.015,211.639z"/>
    </svg>
  );

  const foodCategories = [
    { key: "pizza",      label: "Pizza",      Icon: IconPizza,      bg: "#FFDDD2", color: "#C1440E" },
    { key: "hamburguer", label: "Hambúrguer", Icon: IconHamburguer, bg: "#FFF3C2", color: "#A0730A" },
    { key: "japonesa",   label: "Japonesa",   Icon: IconJaponesa,   bg: "#FFD6D6", color: "#B71C1C" },
    { key: "mexicana",   label: "Mexicana",   Icon: IconMexicana,   bg: "#FFE8CC", color: "#BF5C00" },
    { key: "churrasco",  label: "Churrasco",  Icon: IconChurrasco,  bg: "#EDE8E3", color: "#5D4037" },
  ];
  const safetyConfig = localizeSafetyLevelConfig(language)[restaurant.safetyLevel];

  return (
    <div className="flex flex-col" style={{ backgroundColor: "#FFFFFF", marginBottom: "-128px", fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}>
      {/* Header claro */}
      <div
        className="flex items-center justify-between gap-3 px-5"
        style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 28px)", paddingBottom: 16, backgroundColor: "#FFFFFF" }}
      >
        <div className="flex items-center gap-3">
          <Link
            href="/busca"
            className="w-9 h-9 rounded-full flex items-center justify-center active:scale-90 transition-transform shrink-0"
            style={{ backgroundColor: "#1F3D34" }}
          >
            <ArrowLeft size={18} style={{ color: "#FFFFFF" }} />
          </Link>
          <p className="font-extrabold text-[18px] leading-tight" style={{ color: "#1F3D34", fontFamily: "var(--font-nunito), 'Nunito', sans-serif", fontWeight: 900 }}>{t.restaurante.headerTitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigator.share?.({ title: restaurant.name, url: window.location.href })}
            className="w-9 h-9 rounded-full flex items-center justify-center active:scale-90 transition-transform"
            style={{ backgroundColor: "#1F3D34" }}
          >
            <svg width={16} height={16} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <path fill="#FFFFFF" d="M27.71,4.29a1,1,0,0,0-1.05-.23l-22,8a1,1,0,0,0,0,1.87l9.6,3.84,3.84,9.6A1,1,0,0,0,19,28h0a1,1,0,0,0,.92-.66l8-22A1,1,0,0,0,27.71,4.29ZM19,24.2l-2.79-7L21,12.41,19.59,11l-4.83,4.83L7.8,13,25.33,6.67Z"/>
            </svg>
          </button>
          <button
            onClick={() => setIsFav(!isFav)}
            className="w-9 h-9 rounded-full flex items-center justify-center active:scale-90 transition-transform"
            style={{ backgroundColor: "#1F3D34" }}
          >
            <Heart size={16} fill={isFav ? "#E53935" : "none"} style={{ color: isFav ? "#E53935" : "#FFFFFF" }} />
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-64 overflow-hidden">
        <Image src={restaurant.image} alt={restaurant.name} fill className="object-cover" unoptimized />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
      </div>

      {/* Info Card — sobrepõe o final da hero */}
      <div className="bg-white px-5 pt-5 pb-0 relative z-10 -mt-8" style={{ borderTopLeftRadius: 32, borderTopRightRadius: 32, boxShadow: "0 -4px 20px rgba(0,0,0,0.08)" }}>

        {/* Avatar + nome + rating */}
        <div className="flex items-center gap-3 mb-1.5">
          {/* Avatar com logo do restaurante — mantido como está */}
          <div
            className="w-14 h-14 rounded-2xl overflow-hidden shrink-0"
            style={{ backgroundColor: "#1F3D34" }}
          >
            {RESTAURANT_LOGOS[restaurant.name] ? (
              <img src={RESTAURANT_LOGOS[restaurant.name]} alt={restaurant.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-[22px] font-black" style={{ color: "#C6F59D" }}>
                  {restaurant.name.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Nome + hashtag + rating */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h1 className="text-[18px] font-extrabold leading-tight" style={{ color: "#1F3D34", fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}>{restaurant.name}</h1>
              <div className="flex flex-col items-end shrink-0">
                <div className="flex items-center gap-1">
                  <IconEstrela size={14} fill="#FFC24D" />
                  <span className="font-extrabold text-[15px]" style={{ color: "#1F3D34" }}>{restaurant.rating}</span>
                </div>
                <span className="text-[10px]" style={{ color: "#9AAFA6" }}>{t.restaurante.reviewsCount.replace("{count}", String(restaurant.reviewCount))}</span>
              </div>
            </div>
            <p className="text-[12px] mt-0.5" style={{ color: "#9AAFA6" }}>
              #{restaurant.cuisine?.replace(/\s*\/\s*/g, "/").replace(/\s+/g, "")}
            </p>
          </div>
        </div>

        {/* Badges — bem avaliado / aberto agora */}
        <div className="flex items-center gap-2 mb-3.5">
          <SafetyBadge level={restaurant.safetyLevel} size="sm" />
          {(() => {
            const statusConfig = restaurant.permanentlyClosed
              ? { label: t.common.permanentlyClosed, bg: "#FCE8E6", text: "#E53935" }
              : restaurant.isOpen
              ? { label: t.common.open,   bg: "#D9F2D9", text: "#2D8C2D" }
              : { label: t.common.closed, bg: "#F5F5F5", text: "#9CA3AF" };
            return (
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full shrink-0 text-[11px] font-bold"
                style={{ backgroundColor: statusConfig.bg, color: statusConfig.text }}
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: statusConfig.text }} />
                {statusConfig.label}
              </div>
            );
          })()}
        </div>

        {/* Lista de informações — endereço, horário, telefone */}
        <div className="space-y-2 mb-1" style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}>
          <div className="flex items-center gap-2">
            <MapPin size={14} style={{ color: "#1F3D34" }} className="shrink-0" />
            <span className="text-[13px]" style={{ color: "#1F3D34" }}>
              {restaurant.address} · {restaurant.distance}
            </span>
          </div>

          {restaurant.openingHours && (
            <div className="flex items-center gap-2">
              <Clock size={14} style={{ color: "#1F3D34" }} className="shrink-0" />
              <span className="text-[13px]" style={{ color: "#1F3D34" }}>{restaurant.openingHours}</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Phone size={14} style={{ color: "#1F3D34" }} className="shrink-0" />
            <span className="text-[13px]" style={{ color: "#1F3D34" }}>{restaurant.phone}</span>
          </div>
        </div>

        <div className="h-1" />

        {/* Divisor */}
        <div className="h-px bg-border/40 mb-1" />

        {/* Tabs */}
        <div className="flex gap-2 py-3">
          {(["sobre", "pratos", "avaliacoes"] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-5 py-2 rounded-full text-[13px] font-black transition-all active:scale-95"
                style={{
                  backgroundColor: isActive ? "#1F3D34" : "transparent",
                  color: isActive ? "#C6F59D" : "#9CA3AF",
                  border: isActive ? "none" : "1.5px solid #E5E7EB",
                }}
              >
                {t.restaurante.tabs[tab]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content — scrollável */}
      <div className="px-5 py-4" style={{ backgroundColor: "#FFFFFF", paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 152px)" }}>

        {/* Sobre */}
        {activeTab === "sobre" && (
          <div className="space-y-5">

            {/* Descrição */}
            <div>
              <h3 className="font-extrabold text-text-primary text-[15px] mb-2">{t.restaurante.about.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{restaurant.description}</p>
            </div>

            {/* Restrições atendidas */}
            {restaurant.restrictions && restaurant.restrictions.length > 0 && (
              <div>
                <h3 className="font-extrabold text-primary text-[15px] mb-3">{t.restaurante.about.restrictionsTitle}</h3>
                <div className="flex flex-wrap gap-2">
                  {restaurant.restrictions.map((r) => (
                    <Tag key={r} label={r} colorConfig={getRestrictionColor(r)} size="md" />
                  ))}
                </div>
              </div>
            )}

            {/* Galeria de fotos */}
            <div>
              <h3 className="font-extrabold text-text-primary text-[15px] mb-3">{t.restaurante.about.galleryTitle}</h3>
              {restaurant.galleryImages && restaurant.galleryImages.length > 0 ? (
                <div className="flex gap-2 overflow-x-auto -mx-5 px-5 pb-1 scrollbar-none">
                  {restaurant.galleryImages.map((src, i) => (
                    <div
                      key={i}
                      className="relative shrink-0 rounded-2xl overflow-hidden"
                      style={{ width: 160, height: 110 }}
                    >
                      <Image
                        src={src}
                        alt={`${restaurant.name} ${i + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex gap-2 overflow-x-auto -mx-5 px-5 pb-1 scrollbar-none">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="relative shrink-0 rounded-2xl overflow-hidden flex flex-col items-center justify-center gap-1.5"
                      style={{ width: 160, height: 110, backgroundColor: "#F0EDE8", border: "1.5px dashed #C8BFB5" }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="#B0977E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="13" r="4" stroke="#B0977E" strokeWidth="1.5"/>
                      </svg>
                      <span className="text-[10px] font-semibold" style={{ color: "#B0977E" }}>{t.restaurante.about.comingSoon}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Pratos principais */}
            {dishesWithPhoto.length > 0 && (
              <div>
                <h3 className="font-extrabold text-primary text-[15px] mb-3">{t.restaurante.about.mainDishesTitle}</h3>
                <div className="flex gap-3 overflow-x-auto pb-1 -mx-5 px-5 scrollbar-none">
                  {dishesWithPhoto.map((dish) => {
                    const isUnsafe = !dish.isGlutenFree && !(dish.adaptations && dish.adaptations.length > 0);
                    const isAdaptable = !!(dish.adaptations && dish.adaptations.length > 0);
                    return (
                      <div key={dish.id} className="flex-none w-32">
                        {isUnsafe ? (
                          /* Status 3: unsafe — greyscale + report */
                          <button
                            onClick={() => setReportDishId(dish.id)}
                            className="w-full text-left active:scale-95 transition-transform"
                          >
                            <div className="relative w-32 h-24 rounded-2xl overflow-hidden mb-2">
                              <Image src={dish.image} alt={dish.name} fill className="object-cover grayscale" unoptimized />
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <Lock size={20} className="text-white" />
                              </div>
                            </div>
                            <p className="text-text-disabled text-xs font-bold leading-tight line-clamp-2">{dish.name}</p>
                            {reportDishId === dish.id && (
                              <div className="mt-1.5 bg-white rounded-xl p-2 border border-border/50 shadow-sm">
                                <p className="text-[10px] text-text-secondary mb-1.5 leading-relaxed">{t.restaurante.about.incompatibleDish}</p>
                                <button
                                  onClick={(e) => { e.stopPropagation(); setReportDishId(null); }}
                                  className="w-full flex items-center justify-center gap-1 bg-warning/15 text-warning rounded-lg py-1.5 text-[10px] font-bold"
                                >
                                  <Flag size={10} />
                                  {t.restaurante.about.requestAdaptation}
                                </button>
                              </div>
                            )}
                          </button>
                        ) : (
                          /* Status 1 (safe) or Status 2 (adaptable) */
                          <Link href={`/restaurante/${restaurant.id}/prato/${dish.id}`} className="block active:scale-95 transition-transform">
                            <div className="relative w-32 h-24 rounded-2xl overflow-hidden mb-2">
                              <Image src={dish.image} alt={dish.name} fill className="object-cover" unoptimized />
                              {isAdaptable ? (
                                <div className="absolute bottom-1.5 left-1.5 bg-warning text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">{t.restaurante.about.adaptable}</div>
                              ) : (
                                <div className="absolute bottom-1.5 left-1.5 bg-success text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">{t.restaurante.about.safe}</div>
                              )}
                            </div>
                            <p className="text-text-primary text-xs font-bold leading-tight line-clamp-2">{dish.name}</p>
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Controle de contaminação cruzada */}
            {restaurant.safetyProcedures && restaurant.safetyProcedures.length > 0 && (
              <div>
                <h3 className="font-extrabold text-text-primary text-[15px] mb-3">{t.restaurante.about.crossContaminationTitle}</h3>
                <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "rgba(31,61,52,0.25)", fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}>
                  <div className="flex items-center gap-2 px-4 py-3" style={{ backgroundColor: "rgba(31,61,52,0.08)" }}>
                    <AlertTriangle size={14} className="shrink-0" style={{ color: "#1F3D34" }} />
                    <p className="font-extrabold text-xs tracking-wide uppercase" style={{ color: "#1F3D34" }}>{t.restaurante.about.safetyProceduresTitle}</p>
                  </div>
                  <div className="bg-surface px-4 py-3 space-y-2">
                    {restaurant.safetyProcedures.map((proc) => (
                      <div key={proc} className="flex items-start gap-2">
                        <CheckCircle size={13} className="shrink-0 mt-0.5" style={{ color: "#1F3D34" }} />
                        <p className="text-xs leading-relaxed" style={{ color: "#1F3D34", fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}>{proc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div className="flex items-start gap-2 px-1">
              <AlertTriangle size={13} className="shrink-0 mt-0.5" style={{ color: "#1F3D34" }} />
              <p className="text-[11px] leading-relaxed" style={{ color: "#1F3D34", fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}>
                {t.restaurante.about.disclaimer}
              </p>
            </div>

            {/* Footer — contact + chef */}
            <div className="bg-surface rounded-2xl p-4 shadow-sm border border-border/50">
              <h3 className="font-bold text-text-primary text-sm mb-3">{t.restaurante.about.contactTitle}</h3>

              <div className="space-y-2.5 mb-4">
                <div className="flex items-center gap-2.5">
                  <MapPin size={13} className="text-primary shrink-0" />
                  <span className="text-text-secondary text-xs">{restaurant.address}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone size={13} className="text-primary shrink-0" />
                  <span className="text-text-secondary text-xs">{restaurant.phone}</span>
                </div>
                {restaurant.email && (
                  <div className="flex items-center gap-2.5">
                    <Mail size={13} className="text-primary shrink-0" />
                    <span className="text-text-secondary text-xs">{restaurant.email}</span>
                  </div>
                )}
                {restaurant.website && (
                  <div className="flex items-center gap-2.5">
                    <Globe size={13} className="text-primary shrink-0" />
                    <a
                      href={restaurant.website.startsWith("http") ? restaurant.website : `https://${restaurant.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary text-xs font-medium underline underline-offset-2 active:opacity-60"
                    >
                      {restaurant.website.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                )}
                {restaurant.instagram && (
                  <div className="flex items-center gap-2.5">
                    <IconInstagram size={13} className="text-primary shrink-0" />
                    <a
                      href={`https://instagram.com/${restaurant.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary text-xs font-medium underline underline-offset-2 active:opacity-60"
                    >
                      @{restaurant.instagram}
                    </a>
                  </div>
                )}
              </div>

              {restaurant.chef && (
                <>
                  <div className="h-px bg-border/40 mb-3" />
                  <div className="flex items-center gap-3">
                    {restaurant.chefPhoto ? (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                        <Image src={restaurant.chefPhoto} alt={restaurant.chef} fill className="object-cover" unoptimized />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary font-bold text-lg">
                        {restaurant.chef[0]}
                      </div>
                    )}
                    <div>
                      <p className="text-[10px] text-text-disabled uppercase tracking-wide font-semibold">{t.restaurante.about.chefLabel}</p>
                      <p className="font-bold text-text-primary text-sm">{restaurant.chef}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Pratos */}
        {activeTab === "pratos" && (
          <div className="space-y-4">


            {dishesWithPhoto.length === 0 ? (
              <div className="flex flex-col items-center py-10 text-center">
                <div className="w-16 h-16 rounded-full bg-border/30 flex items-center justify-center mb-3">
                    <UtensilsCrossed size={28} className="text-text-disabled" strokeWidth={1.5} />
                  </div>
                <p className="text-text-disabled text-sm">{t.restaurante.dishes.empty}</p>
              </div>
            ) : (
              dishesWithPhoto.map((dish) => (
                <Link
                  key={dish.id}
                  href={`/restaurante/${restaurant.id}/prato/${dish.id}`}
                  className="block bg-surface rounded-2xl overflow-hidden shadow-sm border border-border/50 active:scale-[0.98] transition-transform"
                >
                  <div className="relative h-40">
                    <Image src={dish.image} alt={dish.name} fill className="object-cover" unoptimized />
                    {dish.isCertified && (
                      <div className="absolute top-3 left-3 bg-success text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                        <CheckCircle size={10} />
                        {t.restaurante.dishes.certified}
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-text-primary text-base">{dish.name}</h3>
                    <p className="text-text-disabled text-xs mt-1 leading-relaxed">{dish.description}</p>
                    <div className="mt-3">
                      <p className="text-text-disabled text-xs font-semibold mb-2">{t.restaurante.dishes.declaredIngredients}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {dish.ingredients.map((ing) => (
                          <span key={ing} className="bg-white text-text-secondary text-[10px] font-medium px-2 py-1 rounded-full border border-border">
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}

        {/* Avaliações */}
        {activeTab === "avaliacoes" && (
          <div className="space-y-4">

            {/* Resumo de segurança */}
            <div className="bg-surface rounded-2xl p-4 shadow-sm border border-border/50">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-center shrink-0">
                  <p className="text-4xl font-extrabold text-text-primary">{restaurant.rating}</p>
                  <div className="flex justify-center my-1">
                    {[1,2,3,4,5].map((s) => (
                      <IconEstrela key={s} size={11} fill={s <= Math.round(restaurant.rating) ? "#FFC24D" : "#E5E5E5"} />
                    ))}
                  </div>
                  <p className="text-text-disabled text-[10px]">{t.restaurante.reviewsCount.replace("{count}", String(restaurant.reviewCount))}</p>
                </div>
                <div className="flex-1 space-y-1.5">
                  {(["muito_seguro","seguro","moderado","nao_seguro"] as const).map((lvl) => {
                    const count = restaurant.reviews.filter(r => r.safetyLevel === lvl).length;
                    const pct = restaurant.reviews.length ? Math.round((count / restaurant.reviews.length) * 100) : 0;
                    const colors: Record<string,string> = { muito_seguro:"#43A047", seguro:"#F59E0B", moderado:"#FB8C00", nao_seguro:"#EF5350" };
                    const labels = t.restaurante.reviews.safetyLevels;
                    return (
                      <div key={lvl} className="flex items-center gap-2">
                        <span className="text-[10px] text-text-disabled w-16 truncate">{labels[lvl]}</span>
                        <div className="flex-1 h-1.5 bg-border/40 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: colors[lvl] }} />
                        </div>
                        <span className="text-[10px] text-text-disabled w-6 text-right">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {restaurant.reviews.map((review) => {
              const contamLabels = t.restaurante.reviews.contamLabels;
              const teamLabels   = t.restaurante.reviews.teamLabels;

              return (
                <div
                  key={review.id}
                  className="bg-surface rounded-2xl p-4"
                  style={{ boxShadow: "0 2px 14px rgba(0,0,0,0.08)", border: "1px solid var(--color-border)", fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
                >
                  {/* Author row */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 border-2 border-border bg-primary/15 flex items-center justify-center text-sm font-extrabold text-primary">
                        {review.photo ? (
                          <Image src={review.photo} alt={review.author} width={44} height={44} className="object-cover w-full h-full" unoptimized />
                        ) : (
                          review.avatar
                        )}
                      </div>
                      <div>
                        <p className="font-extrabold text-[14px] text-text-primary leading-tight">{review.author}</p>
                        <p className="text-[11px] text-text-disabled mt-0.5">{review.date}</p>
                      </div>
                    </div>
                    {review.verified && (
                      <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full" style={{ backgroundColor: "#1F3D34" }}>
                        <BadgeCheck size={14} strokeWidth={2.2} style={{ color: "#C6F59D" }} />
                        <span className="text-[11px] font-bold" style={{ color: "#C6F59D" }}>{t.restaurante.reviews.verified}</span>
                      </div>
                    )}
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-0.5 mb-2.5">
                    {[1,2,3,4,5].map((s) => (
                      <IconEstrela key={s} size={14} fill={s <= review.rating ? "#FFC24D" : "#E5E5E5"} />
                    ))}
                  </div>

                  {/* Comment */}
                  {review.comment && (
                    <p className="text-[13px] text-text-secondary leading-relaxed mb-3">
                      "{review.comment}"
                    </p>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    <span
                      className="text-[11px] px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: "#C6F59D", color: "#1F3D34", fontFamily: "var(--font-nunito), 'Nunito', sans-serif", fontWeight: 900 }}
                    >
                      {contamLabels[review.contamRisk]}
                    </span>
                    <span
                      className="text-[11px] px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: "#C6F59D", color: "#1F3D34", fontFamily: "var(--font-nunito), 'Nunito', sans-serif", fontWeight: 900 }}
                    >
                      {teamLabels[review.teamKnowledge]}
                    </span>
                    {review.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-2.5 py-1 rounded-full"
                        style={{ backgroundColor: "#C6F59D", color: "#1F3D34", fontFamily: "var(--font-nunito), 'Nunito', sans-serif", fontWeight: 900 }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}

            <Link
              href={`/restaurante/${id}/avaliar`}
              className="w-full flex items-center justify-center gap-2 font-bold py-4 rounded-2xl shadow-md active:scale-95 transition-transform"
              style={{ backgroundColor: "#1F3D34", color: "#C6F59D" }}
            >
              <MessageCircle size={18} />
              {t.restaurante.reviews.writeReview}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
