# InstaKeepPlaying

[![Chrome Extension](https://img.shields.io/badge/Chrome_Extension-Manifest_v3-4285F4?style=flat-square&logo=googlechrome&logoColor=white)](#)
[![Version](https://img.shields.io/badge/version-1.1.0-blue.svg?style=flat-square)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

> Extensão Chrome que impede o Instagram de pausar vídeos, Reels e Stories ao trocar de aba ou minimizar a janela.

---

## Introduction

O Instagram usa a **Page Visibility API** e eventos de foco (`visibilitychange`, `blur`, `pagehide`) para pausar mídia quando a aba deixa de estar visível. O **InstaKeepPlaying** injeta um script em `document_start` no **MAIN world**, fazendo a página achar que a aba está sempre visível.

## Requirements

- Google Chrome (ou Chromium) com suporte a Manifest V3
- Conta no Instagram (web)

## Installation

### Modo desenvolvedor (pasta não empacotada)

1. Clone ou baixe este repositório.
2. Abra `chrome://extensions/` no Chrome.
3. Ative **Modo do desenvolvedor** (canto superior direito).
4. Clique em **Carregar sem compactação**.
5. Selecione a pasta do projeto (`insta-keep-playing-extension`).
6. Abra ou recarregue `https://www.instagram.com` e teste trocando de aba com um Reel/Story tocando.

## Usage

1. Clique no ícone da extensão para **ativar/desativar** (bolinha **verde** = ativo, **cinza** = desativado).
2. Abra o Instagram, reproduza um vídeo/Reel/Story.
3. Troque de aba ou minimize — com a opção ativa, a mídia continua tocando.

Ao alternar, abas do Instagram são recarregadas para aplicar o estado. Escopo: `*://*.instagram.com/*`.

## How It Works

Em `document_start` (antes do JS do Instagram):

1. `document.hidden` / `webkitHidden` → sempre `false`
2. `document.visibilityState` → sempre `'visible'`
3. Bloqueio de `visibilitychange`, `blur` e `pagehide` (fase de captura + `stopImmediatePropagation`)

Arquivos principais:

| Arquivo | Função |
|---------|--------|
| `manifest.json` | Manifest V3 e permissões |
| `background.js` | Toggle no ícone + badge verde/cinza |
| `content.js` | Injeta `inject.js` só se estiver ativo |
| `inject.js` | Override da Visibility API e bloqueio de eventos |

## Contributing

PRs são bem-vindos. Mantenha o escopo só no Instagram e evite permissões desnecessárias.

## Changelog

### 1.1.0

- Clique no ícone para ativar/desativar
- Badge verde/cinza no ícone indicando o estado

### 1.0.0

- Override da Page Visibility API
- Bloqueio de `visibilitychange`, `blur` e `pagehide`
- Injeção em MAIN world em `document_start`
