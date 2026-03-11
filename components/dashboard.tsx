"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL, getApiStatus, getCourses, normalizeCourses } from "@/lib/api";

type DashboardProps = {
  showHealth?: boolean;
  showCourses?: boolean;
};

export function Dashboard({ showHealth = true, showCourses = true }: DashboardProps) {
  const healthQuery = useQuery({
    queryKey: ["health"],
    queryFn: getApiStatus,
    enabled: showHealth
  });

  const courseQuery = useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
    enabled: showCourses
  });

  const courses = courseQuery.data ? normalizeCourses(courseQuery.data) : [];

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 px-6 py-10">
      <header className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">EdTech Platform</p>
        <h1 className="mt-2 text-3xl font-bold">Frontend connected to your backend</h1>
        <p className="mt-2 text-sm text-slate-600">Base URL: {API_BASE_URL}</p>
        <nav className="mt-4 flex gap-3 text-sm">
          <Link className="rounded bg-indigo-600 px-3 py-1.5 text-white hover:bg-indigo-700" href="/">
            Dashboard
          </Link>
          <Link className="rounded border border-slate-300 px-3 py-1.5 hover:bg-slate-100" href="/health">
            Health Route
          </Link>
          <Link className="rounded border border-slate-300 px-3 py-1.5 hover:bg-slate-100" href="/courses">
            Courses Route
          </Link>
        </nav>
      </header>

      {showHealth && (
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Backend Health</h2>
          {healthQuery.isPending && <p className="mt-3 text-slate-500">Checking backend...</p>}
          {healthQuery.isError && (
            <p className="mt-3 text-red-600">
              Could not connect. Set NEXT_PUBLIC_API_URL to your backend URL.
            </p>
          )}
          {healthQuery.data && (
            <pre className="mt-3 overflow-x-auto rounded bg-slate-100 p-3 text-sm text-green-800">
              {JSON.stringify(healthQuery.data, null, 2)}
            </pre>
          )}
        </section>
      )}

      {showCourses && (
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Courses</h2>
          {courseQuery.isPending && <p className="mt-3 text-slate-500">Loading courses...</p>}
          {courseQuery.isError && (
            <p className="mt-3 text-red-600">Unable to fetch courses from backend routes.</p>
          )}
          {courseQuery.data && courses.length === 0 && (
            <p className="mt-3 text-slate-500">No courses returned by backend yet.</p>
          )}
          {courses.length > 0 && (
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {courses.map((course) => (
                <li
                  key={String(course.id ?? course.title)}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                >
                  <h3 className="font-semibold">{String(course.title ?? "Untitled Course")}</h3>
                  <p className="text-sm text-slate-600">
                    Instructor: {String(course.instructor ?? "N/A")}
                  </p>
                  <span className="mt-2 inline-block rounded-full bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-700">
                    {String(course.level ?? "General")}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </main>
  );
}
