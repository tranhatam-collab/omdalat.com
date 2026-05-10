import {
  communities as runtimeCommunities,
  events as runtimeEvents,
  experts as runtimeExperts,
  getCommunityBySlug as runtimeGetCommunityBySlug,
  getEventBySlug as runtimeGetEventBySlug,
  getExpertBySlug as runtimeGetExpertBySlug,
  getHostBySlug as runtimeGetHostBySlug,
  getPlaceBySlug as runtimeGetPlaceBySlug,
  getProofBySlug as runtimeGetProofBySlug,
  hosts as runtimeHosts,
  places as runtimePlaces,
  proofs as runtimeProofs,
  resolveLocalizedText as runtimeResolveLocalizedText
} from "../../../services/api/index";
import type { OmdalatLocale } from "../../../packages/core";
import type { MaybeLocalizedText } from "../../../packages/types";

export const places = runtimePlaces;
export const hosts = runtimeHosts;
export const experts = runtimeExperts;
export const communities = runtimeCommunities;
export const events = runtimeEvents;
export const proofs = runtimeProofs;

export function resolveLocalizedText(value: MaybeLocalizedText, locale: OmdalatLocale = "en") {
  return runtimeResolveLocalizedText(value, locale);
}

export function getPlaceBySlug(slug: string) {
  return runtimeGetPlaceBySlug(slug);
}

export function getHostBySlug(slug: string) {
  return runtimeGetHostBySlug(slug);
}

export function getExpertBySlug(slug: string) {
  return runtimeGetExpertBySlug(slug);
}

export function getCommunityBySlug(slug: string) {
  return runtimeGetCommunityBySlug(slug);
}

export function getEventBySlug(slug: string) {
  return runtimeGetEventBySlug(slug);
}

export function getProofBySlug(slug: string) {
  return runtimeGetProofBySlug(slug);
}
