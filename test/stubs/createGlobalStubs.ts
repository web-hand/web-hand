import { HTML_MEDIA_ELEMENT_PAUSE_STUB, HTML_MEDIA_ELEMENT_PLAY_STUB } from './HTML_MEDIA_ELEMENT.stub';

export function createGlobalStubs(): void {
  console.info(
    `${HTMLMediaElement.name} stub has been created. Stubbed methods: [${HTML_MEDIA_ELEMENT_PLAY_STUB.name}, ${HTML_MEDIA_ELEMENT_PAUSE_STUB.name}]`
  );
}

export function restoreGlobalStubs(): void {
  HTML_MEDIA_ELEMENT_PLAY_STUB.restore();
  HTML_MEDIA_ELEMENT_PAUSE_STUB.restore();
}
