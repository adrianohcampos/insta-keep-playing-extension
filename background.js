const STORAGE_KEY = 'enabled';
const DEFAULT_ENABLED = true;

const BADGE = {
  on: { text: '●', color: '#22c55e', title: 'InstaKeepPlaying: ativo — clique para desativar' },
  off: { text: '●', color: '#9ca3af', title: 'InstaKeepPlaying: desativado — clique para ativar' },
};

async function getEnabled() {
  const data = await chrome.storage.local.get({ [STORAGE_KEY]: DEFAULT_ENABLED });
  return data[STORAGE_KEY] !== false;
}

async function setBadge(enabled) {
  const state = enabled ? BADGE.on : BADGE.off;
  await chrome.action.setBadgeText({ text: state.text });
  await chrome.action.setBadgeBackgroundColor({ color: state.color });
  await chrome.action.setBadgeTextColor({ color: '#ffffff' });
  await chrome.action.setTitle({ title: state.title });
}

async function reloadInstagramTabs() {
  const tabs = await chrome.tabs.query({ url: ['*://*.instagram.com/*', '*://instagram.com/*'] });
  await Promise.all(tabs.map((tab) => chrome.tabs.reload(tab.id).catch(() => {})));
}

chrome.runtime.onInstalled.addListener(async () => {
  const data = await chrome.storage.local.get(STORAGE_KEY);
  if (data[STORAGE_KEY] === undefined) {
    await chrome.storage.local.set({ [STORAGE_KEY]: DEFAULT_ENABLED });
  }
  await setBadge(await getEnabled());
});

chrome.runtime.onStartup.addListener(async () => {
  await setBadge(await getEnabled());
});

chrome.action.onClicked.addListener(async () => {
  const enabled = !(await getEnabled());
  await chrome.storage.local.set({ [STORAGE_KEY]: enabled });
  await setBadge(enabled);
  await reloadInstagramTabs();
});

getEnabled().then(setBadge);
