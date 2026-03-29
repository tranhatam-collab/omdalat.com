import activitiesData from "../../../data/activities.json";
import communitiesData from "../../../data/communities.json";
import expertsData from "../../../data/experts.json";
import hostsData from "../../../data/hosts.json";
import placesData from "../../../data/places.json";
import proofsData from "../../../data/proofs.json";

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const places = placesData.map((item) => ({
  ...item,
  slug: slugify(item.name)
}));

export const hosts = hostsData.map((item) => ({
  ...item,
  slug: slugify(item.name)
}));

export const experts = expertsData.map((item) => ({
  ...item,
  slug: slugify(item.name)
}));

export const communities = communitiesData.map((item) => ({
  ...item,
  slug: slugify(item.name)
}));

export const events = activitiesData.map((item) => ({
  ...item,
  slug: slugify(item.title)
}));

export const proofs = proofsData.map((item) => ({
  ...item,
  slug: slugify(item.title)
}));

export function getPlaceBySlug(slug: string) {
  return places.find((item) => item.slug === slug);
}

export function getHostBySlug(slug: string) {
  return hosts.find((item) => item.slug === slug);
}

export function getExpertBySlug(slug: string) {
  return experts.find((item) => item.slug === slug);
}

export function getCommunityBySlug(slug: string) {
  return communities.find((item) => item.slug === slug);
}

export function getEventBySlug(slug: string) {
  return events.find((item) => item.slug === slug);
}

export function getProofBySlug(slug: string) {
  return proofs.find((item) => item.slug === slug);
}
