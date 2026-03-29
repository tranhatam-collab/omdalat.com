import { permissionHighlights } from "../../packages/core/config";
import { slugify } from "../../packages/core/utils";
import type {
  CommunityRecord,
  EventRecord,
  ExpertRecord,
  HostRecord,
  MemberSession,
  NodeRecord,
  PlaceRecord,
  ProofRecord,
  RequestRecord
} from "../../packages/types";
import activitiesData from "../../data/activities.json";
import communitiesData from "../../data/communities.json";
import expertsData from "../../data/experts.json";
import hostsData from "../../data/hosts.json";
import nodesData from "../../data/nodes.json";
import placesData from "../../data/places.json";
import proofsData from "../../data/proofs.json";
import requestsData from "../../data/requests.json";

const enrich = <T extends { name?: string; title?: string }>(item: T) => ({
  ...item,
  slug: slugify(item.name ?? item.title ?? "")
});

export const places = placesData.map((item) => enrich(item)) as PlaceRecord[];
export const hosts = hostsData.map((item) => enrich(item)) as HostRecord[];
export const experts = expertsData.map((item) => enrich(item)) as ExpertRecord[];
export const communities = communitiesData.map((item) => enrich(item)) as CommunityRecord[];
export const events = activitiesData.map((item) => enrich(item)) as EventRecord[];
export const proofs = proofsData.map((item) => enrich(item)) as ProofRecord[];
export const requests = requestsData.map((item) => enrich(item)) as RequestRecord[];
export const nodes = nodesData.map((item) => enrich(item)) as NodeRecord[];

function getBySlug<T extends { slug: string }>(collection: T[], slug: string) {
  return collection.find((item) => item.slug === slug);
}

export function getCurrentMemberSession(): MemberSession {
  const leadHost = hosts[0];
  const leadNode = nodes[0];

  return {
    name: leadHost.name,
    role: "verified_member",
    homeNode: leadNode.name,
    status: `Fixture session with ${permissionHighlights.length} scoped permissions`,
    zone: leadHost.zone
  };
}

export function getDashboardSnapshot() {
  return {
    places,
    hosts,
    experts,
    communities,
    events,
    proofs,
    requests,
    nodes
  };
}

export function getPlaceBySlug(slug: string) {
  return getBySlug(places, slug);
}

export function getHostBySlug(slug: string) {
  return getBySlug(hosts, slug);
}

export function getExpertBySlug(slug: string) {
  return getBySlug(experts, slug);
}

export function getCommunityBySlug(slug: string) {
  return getBySlug(communities, slug);
}

export function getEventBySlug(slug: string) {
  return getBySlug(events, slug);
}

export function getProofBySlug(slug: string) {
  return getBySlug(proofs, slug);
}
