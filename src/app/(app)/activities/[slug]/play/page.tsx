"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { ActivityPlayer } from "@/components/ActivityPlayer";
import { getActivity } from "@/lib/activities";

export default function PlayPage() {
  const params = useParams<{ slug: string }>();
  const activity = getActivity(params.slug);
  if (!activity) notFound();
  return <ActivityPlayer activity={activity} />;
}
