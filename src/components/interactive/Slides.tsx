import { slideMetaList } from '../../data/slides.config';
import { slideComponents } from './slides/index';

export function Slides() {
  return (
    <>
      {slideMetaList.map((meta, index) => {
        const Slide = slideComponents[meta.id];
        if (!Slide) {
          console.error(`No component registered for slide "${meta.id}"`);
          return null;
        }
        return <Slide key={meta.id} index={index} meta={meta} />;
      })}
    </>
  );
}
