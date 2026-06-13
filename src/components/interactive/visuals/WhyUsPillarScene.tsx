import { Fragment } from 'react';
import { fluidEase } from '../../../lib/motion';
import { motion } from 'motion/react';
import {
  Briefcase,
  Check,
  Globe2,
  Settings2,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import type { WhyUsPillarId } from './whyUs.visual.config';

export interface WhyUsIndustryScene {
  caption: string;
  tags: string[];
}

export interface WhyUsEditionsScene {
  caption: string;
  community: { label: string; note: string };
  enterprise: { label: string; note: string };
  verdict: string;
}

export interface WhyUsVersionsScene {
  caption: string;
  versions: string[];
  latestLabel: string;
}

export interface WhyUsWorkflowScene {
  caption: string;
  steps: string[];
}

export type WhyUsSceneMap = {
  industry: WhyUsIndustryScene;
  editions: WhyUsEditionsScene;
  versions: WhyUsVersionsScene;
  workflow: WhyUsWorkflowScene;
};

const workflowIcons: LucideIcon[] = [Briefcase, Settings2, Sparkles];

interface WhyUsPillarSceneProps {
  pillarId: WhyUsPillarId;
  scene: WhyUsSceneMap[WhyUsPillarId];
  active: boolean;
  reducedMotion: boolean | null;
}

function SceneConnector({
  active,
  delay = 0,
  reducedMotion,
}: {
  active: boolean;
  delay?: number;
  reducedMotion: boolean | null;
}) {
  return (
    <div
      className="relative h-0.5 w-full overflow-hidden rounded-full bg-brand-cyan/15"
      aria-hidden
    >
      <motion.div
        className="absolute inset-0 origin-left rounded-full bg-brand-cyan/50"
        initial={{ scaleX: reducedMotion ? 1 : 0 }}
        animate={{ scaleX: active ? 1 : 0 }}
        transition={{ duration: 0.45, delay: reducedMotion ? 0 : delay, ease: fluidEase }}
      />
    </div>
  );
}

function IndustryScene({
  scene,
  active,
  reducedMotion,
}: {
  scene: WhyUsIndustryScene;
  active: boolean;
  reducedMotion: boolean | null;
}) {
  return (
    <div className="flex min-h-0 flex-col py-1">
      <motion.div
        className="mx-auto"
        initial={{ opacity: 0, scale: 0.85, rotate: reducedMotion ? 0 : -12 }}
        animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.85, rotate: 0 }}
        transition={{ duration: 0.5, ease: fluidEase }}
      >
        <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-brand-cyan/20 bg-brand-cyan/8 text-brand-cyan">
          <Globe2 size={20} strokeWidth={2} />
          <motion.span
            className="absolute inset-0 rounded-full border border-brand-cyan/20"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: active ? 1.55 : 1, opacity: active ? 0 : 0.6 }}
            transition={{ duration: 0.85, ease: fluidEase }}
            aria-hidden
          />
        </span>
      </motion.div>

      <div className="mt-3 flex flex-wrap justify-center gap-1.5">
        {scene.tags.map((tag, i) => (
          <motion.span
            key={tag}
            className="rounded-full border border-brand-cyan/15 bg-white/80 px-2.5 py-1 text-xs font-medium text-brand-navy/65 shadow-sm"
            initial={{ opacity: 0, y: 8, scale: 0.92 }}
            animate={{ opacity: active ? 1 : 0, y: active ? 0 : 8, scale: active ? 1 : 0.92 }}
            transition={{
              duration: 0.35,
              delay: reducedMotion ? 0 : 0.12 + i * 0.06,
              ease: fluidEase,
            }}
          >
            {tag}
          </motion.span>
        ))}
      </div>

      <motion.p
        className="mt-3 shrink-0 text-center text-xs font-medium leading-snug text-brand-navy/45"
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.35, delay: reducedMotion ? 0 : 0.55, ease: fluidEase }}
      >
        {scene.caption}
      </motion.p>
    </div>
  );
}

function EditionsScene({
  scene,
  active,
  reducedMotion,
}: {
  scene: WhyUsEditionsScene;
  active: boolean;
  reducedMotion: boolean | null;
}) {
  const editions = [
    { key: 'community', ...scene.community },
    { key: 'enterprise', ...scene.enterprise },
  ] as const;

  return (
    <div className="flex min-h-0 flex-col py-1">
      <div className="relative grid grid-cols-2 gap-2.5">
        {editions.map((edition, i) => (
          <motion.div
            key={edition.key}
            className="relative overflow-hidden rounded-xl border border-brand-navy/8 bg-white/80 px-3 py-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: active ? 1 : 0, y: active ? 0 : 10 }}
            transition={{
              duration: 0.4,
              delay: reducedMotion ? 0 : 0.08 + i * 0.12,
              ease: fluidEase,
            }}
          >
            <motion.span
              className="absolute inset-x-0 top-0 h-0.5 origin-left bg-brand-cyan"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: active ? 1 : 0 }}
              transition={{
                duration: 0.45,
                delay: reducedMotion ? 0 : 0.2 + i * 0.14,
                ease: fluidEase,
              }}
            />
            <p className="text-xs font-bold uppercase tracking-wide text-brand-deep-navy">{edition.label}</p>
            <p className="mt-1 text-[11px] leading-snug text-brand-navy/55">{edition.note}</p>
          </motion.div>
        ))}

        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-brand-cyan/30 bg-white text-brand-cyan shadow-sm"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.6 }}
          transition={{ duration: 0.35, delay: reducedMotion ? 0 : 0.38, ease: fluidEase }}
          aria-hidden
        >
          <span className="text-[10px] font-bold">vs</span>
        </motion.div>
      </div>

      <motion.div
        className="mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-brand-cyan"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: active ? 1 : 0, y: active ? 0 : 6 }}
        transition={{ duration: 0.35, delay: reducedMotion ? 0 : 0.48, ease: fluidEase }}
      >
        <Check size={14} strokeWidth={2.5} />
        {scene.verdict}
      </motion.div>

      <motion.p
        className="mt-2 shrink-0 text-center text-xs font-medium leading-snug text-brand-navy/45"
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.35, delay: reducedMotion ? 0 : 0.58, ease: fluidEase }}
      >
        {scene.caption}
      </motion.p>
    </div>
  );
}

function VersionsScene({
  scene,
  active,
  reducedMotion,
}: {
  scene: WhyUsVersionsScene;
  active: boolean;
  reducedMotion: boolean | null;
}) {
  const lastIndex = scene.versions.length - 1;

  return (
    <div className="flex min-h-0 flex-col py-1">
      <div className="flex w-full items-start">
        {scene.versions.map((version, i) => {
          const isLatest = i === lastIndex;

          return (
            <Fragment key={version}>
              {i > 0 && (
                <div className="flex min-w-[0.5rem] flex-1 items-center self-start pt-[1.125rem]">
                  <SceneConnector
                    active={active}
                    reducedMotion={reducedMotion}
                    delay={0.1 + i * 0.08}
                  />
                </div>
              )}
              <motion.div
                className="flex shrink-0 flex-col items-center"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: active ? 1 : 0, y: active ? 0 : 8 }}
                transition={{
                  duration: 0.35,
                  delay: reducedMotion ? 0 : 0.15 + i * 0.1,
                  ease: fluidEase,
                }}
              >
                <motion.span
                  className={`flex h-9 w-9 items-center justify-center rounded-lg text-[11px] font-bold tabular-nums ${
                    isLatest
                      ? 'bg-brand-cyan text-white shadow-md shadow-brand-cyan/25'
                      : 'border border-brand-navy/10 bg-white text-brand-navy/50'
                  }`}
                  initial={{ scale: reducedMotion ? 1 : 0.88 }}
                  animate={{ scale: active ? 1 : 0.88 }}
                  transition={{
                    duration: 0.35,
                    delay: reducedMotion ? 0 : 0.2 + i * 0.1,
                    ease: fluidEase,
                  }}
                >
                  {version.replace('v', '')}
                </motion.span>
                {isLatest && (
                  <motion.span
                    className="mt-1.5 rounded-full bg-brand-cyan/12 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-brand-cyan"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: active ? 1 : 0, y: active ? 0 : 4 }}
                    transition={{ duration: 0.3, delay: reducedMotion ? 0 : 0.55, ease: fluidEase }}
                  >
                    {scene.latestLabel}
                  </motion.span>
                )}
              </motion.div>
            </Fragment>
          );
        })}
      </div>

      <motion.p
        className="mt-4 shrink-0 text-center text-xs font-medium leading-snug text-brand-navy/45"
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.35, delay: reducedMotion ? 0 : 0.62, ease: fluidEase }}
      >
        {scene.caption}
      </motion.p>
    </div>
  );
}

function WorkflowScene({
  scene,
  active,
  reducedMotion,
}: {
  scene: WhyUsWorkflowScene;
  active: boolean;
  reducedMotion: boolean | null;
}) {
  return (
    <div className="flex min-h-0 flex-col py-1">
      <div className="flex w-full items-start">
        {scene.steps.map((step, i) => {
          const Icon = workflowIcons[i] ?? Briefcase;
          const isLast = i === scene.steps.length - 1;

          return (
            <Fragment key={step}>
              {i > 0 && (
                <div className="flex min-w-[0.5rem] flex-1 items-center self-start pt-[1.125rem]">
                  <SceneConnector
                    active={active}
                    reducedMotion={reducedMotion}
                    delay={0.12 + i * 0.1}
                  />
                </div>
              )}
              <motion.div
                className="flex min-w-0 flex-1 flex-col items-center px-0.5 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: active ? 1 : 0, y: active ? 0 : 10 }}
                transition={{
                  duration: 0.4,
                  delay: reducedMotion ? 0 : 0.12 + i * 0.14,
                  ease: fluidEase,
                }}
              >
                <motion.span
                  className={`mb-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border shadow-sm ${
                    isLast
                      ? 'border-brand-cyan/30 bg-brand-cyan text-white shadow-brand-cyan/20'
                      : 'border-brand-cyan/20 bg-white text-brand-cyan'
                  }`}
                  initial={{ scale: reducedMotion ? 1 : 0.85 }}
                  animate={{ scale: active ? 1 : 0.85 }}
                  transition={{
                    duration: 0.35,
                    delay: reducedMotion ? 0 : 0.18 + i * 0.14,
                    ease: fluidEase,
                  }}
                >
                  <Icon size={16} strokeWidth={2} />
                </motion.span>
                <span className="w-full text-[10px] font-semibold leading-snug text-brand-navy/70 sm:text-[11px]">
                  {step}
                </span>
              </motion.div>
            </Fragment>
          );
        })}
      </div>

      <motion.p
        className="mt-4 shrink-0 text-center text-xs font-medium leading-snug text-brand-navy/45"
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.35, delay: reducedMotion ? 0 : 0.58, ease: fluidEase }}
      >
        {scene.caption}
      </motion.p>
    </div>
  );
}

export function WhyUsPillarScene({ pillarId, scene, active, reducedMotion }: WhyUsPillarSceneProps) {
  switch (pillarId) {
    case 'industry':
      return <IndustryScene scene={scene} active={active} reducedMotion={reducedMotion} />;
    case 'editions':
      return <EditionsScene scene={scene} active={active} reducedMotion={reducedMotion} />;
    case 'versions':
      return <VersionsScene scene={scene} active={active} reducedMotion={reducedMotion} />;
    case 'workflow':
      return <WorkflowScene scene={scene} active={active} reducedMotion={reducedMotion} />;
  }
}
