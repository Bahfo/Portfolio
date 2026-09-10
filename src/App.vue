<template>
  <div class="desktop" @click="onDesktopClick">
    <DesktopIcon
      v-for="icon in icons"
      :key="icon.id"
      :icon="icon.icon"
      :label="icon.label"
      :soft="icon.soft"
      @open="openWindow(icon.windowId)"
    />

    <!-- Right side: XP Calendar + Tetris button -->
    <div class="desktop-right">
      <XpCalendar />
      <button class="tetris-launcher" @click="openWindow('win-tetris')">
        <img src="https://win98icons.alexmeub.com/icons/png/notepad-4.png" width="20" height="20" style="filter: saturate(0.85) brightness(1.05)"/>
        <span>Tetris</span>
        <small>Play me!</small>
      </button>
    </div>

    <DraggableWindow
      v-for="win in windows"
      :key="win.id"
      v-show="win.isOpen"
      :title="win.title"
      :initial-top="win.top"
      :initial-left="win.left"
      :z-index="win.zIndex"
      :minimized="win.minimized"
      :width="win.width || 420"
      :height="win.height || 320"
      @close="closeWindow(win.id)"
      @minimize="toggleMinimize(win.id)"
      @bringToFront="bringToFront(win.id)"
    >
      <!-- ABOUT ME -->
      <template v-if="win.id === 'win-about'">
        <div class="xp-content">
          <div class="about-header">
            <div style="display:flex; gap:10px; align-items:center">
              <img src="https://win98icons.alexmeub.com/icons/png/computer_explorer-4.png" width="32" height="32" alt="user"/>
              <div>
                <h2 class="about-name">Bahaa Nofal</h2>
                <div class="about-title">COMPUTER &amp; COMMUNICATIONS ENGINEERING | SOFTWARE &amp; EMBEDDED SYSTEMS</div>
              </div>
            </div>
            <div class="about-badge">BN</div>
          </div>

          <fieldset class="xp-fieldset">
            <legend><img class="legend-icon" src="https://win98icons.alexmeub.com/icons/png/help_book_cool-4.png" /> Profile</legend>
            <p class="quote">“Dedicated to continuous improvement — technical literature, open-source contribution, and modern hardware / software paradigms.”</p>
            <p>
              Computer &amp; Communications Engineering student at <b>Al-Zaytoonah University of Jordan</b> (Sep 2024 – Present, GPA <b>3.77 / 4.00</b>). Passionate about embedded systems, IoT telemetry, developer tooling and programming language design.
            </p>
            <p><img src="https://win98icons.alexmeub.com/icons/png/users-2.png" width="16" height="16" style="vertical-align:middle; margin-right:4px"/> ComSoc Chapter Chair at <b>IEEE Student Branch — 2025</b>, leading technical chapter, events &amp; peer development.</p>
          </fieldset>

          <fieldset class="xp-fieldset">
            <legend><img class="legend-icon" src="https://win98icons.alexmeub.com/icons/png/help_book_cool-4.png" /> Academic Focus</legend>
            <div class="xp-tags">
              <span class="xp-tag"><img src="https://win98icons.alexmeub.com/icons/png/computer-4.png" width="12" height="12"/> Cloud Computing &amp; Databases</span>
              <span class="xp-tag"><img src="https://win98icons.alexmeub.com/icons/png/computer_explorer-4.png" width="12" height="12"/> Machine &amp; Deep Learning</span>
              <span class="xp-tag"><img src="https://win98icons.alexmeub.com/icons/png/network_normal_two_pcs-4.png" width="12" height="12"/> Computer Networks</span>
            </div>
          </fieldset>

          <div class="xp-actions">
            <XpButton @click="openWindow('win-experience')"><img src="https://win98icons.alexmeub.com/icons/png/msie1-4.png" width="12" height="12"/> View Experience</XpButton>
            <XpButton @click="openWindow('win-projects')"><img src="https://win98icons.alexmeub.com/icons/png/directory_explorer-4.png" width="12" height="12"/> View Projects</XpButton>
            <XpButton @click="openWindow('win-contact')"><img src="https://win98icons.alexmeub.com/icons/png/envelope_closed-1.png" width="12" height="12"/> Contact Me</XpButton>
          </div>
        </div>
      </template>

      <!-- RESEARCH EXPERIENCE - BROWSER UTILITY -->
      <template v-else-if="win.id === 'win-experience'">
        <div class="browser win-experience-soft">
          <div class="browser-toolbar xp-toolbar">
            <button class="xp-tool-btn" disabled><img src="https://win98icons.alexmeub.com/icons/png/directory_closed-4.png" width="12" height="12"/> Back</button>
            <button class="xp-tool-btn" disabled><img src="https://win98icons.alexmeub.com/icons/png/directory_closed-4.png" width="12" height="12"/> Forward</button>
            <button class="xp-tool-btn" @click="browserRefreshKey++"><img src="https://win98icons.alexmeub.com/icons/png/search_file_2-4.png" width="12" height="12"/> Refresh</button>
            <button class="xp-tool-btn"><img src="https://win98icons.alexmeub.com/icons/png/desktop-4.png" width="12" height="12"/> Home</button>
            <div class="browser-address">
              <span>Address</span>
              <div class="address-bar"><img src="https://win98icons.alexmeub.com/icons/png/msie1-4.png" width="12" height="12"/> xp://experience/{{ activeExpTab === 'iiot' ? 'iiot-telemetry' : 'raspberry-prototype' }}</div>
            </div>
          </div>

          <div class="browser-tabs">
            <div class="browser-tab" :class="{active: activeExpTab==='iiot'}" @click="activeExpTab='iiot'">
              <img src="https://win98icons.alexmeub.com/icons/png/world-4.png" width="12" height="12"/> IIoT Telemetry System
            </div>
            <div class="browser-tab" :class="{active: activeExpTab==='prototype'}" @click="activeExpTab='prototype'">
              <img src="https://win98icons.alexmeub.com/icons/png/computer-4.png" width="12" height="12"/> Raspberry Pi Prototype
            </div>
            <!-- not closable -->
          </div>

          <div class="browser-content" :key="browserRefreshKey">
            <div v-if="activeExpTab==='iiot'" class="browser-page">
              <div class="page-header">
                <img src="https://win98icons.alexmeub.com/icons/png/network_normal_two_pcs-4.png" width="24" height="24"/>
                <div>
                  <h3>IIoT Technical Research — Research Assistant and Code Maintainer</h3>
                  <div class="meta">Industrial IoT / Telemetry Systems &nbsp;|&nbsp; <b>JUL 2026 – AUG 2026</b></div>
                </div>
              </div>
              <fieldset class="xp-fieldset highlight">
                <legend><img class="legend-icon" src="https://win98icons.alexmeub.com/icons/png/settings_gear-4.png"/>Overview</legend>
                <ul class="xp-list">
                  <li><img src="https://win98icons.alexmeub.com/icons/png/computer-4.png" width="10" height="10"/> Engineered a remote IoT telemetry system leveraging the <b>CoIoT protocol</b> to control Shelly sensors and execute automated real-time data acquisition.</li>
                  <li><img src="https://win98icons.alexmeub.com/icons/png/network_internet_pcs_installer-4.png" width="10" height="10"/> Architected an <b>edge-to-cloud telemetry pipeline</b> using <b>Node-RED</b> to orchestrate real-time sensor data collection and server transmission, while deploying <b>Telegraf</b> for edge device health and performance monitoring.</li>
                </ul>
              </fieldset>
              <div class="xp-tags">
                <span class="xp-tag">CoIoT</span><span class="xp-tag">Shelly</span><span class="xp-tag">Node-RED</span><span class="xp-tag">Telegraf</span><span class="xp-tag">Telemetry</span>
              </div>
              <div class="xp-infobox"><b><img src="https://win98icons.alexmeub.com/icons/png/world-4.png" width="12" height="12"/> Research Impact:</b> Enabled real-time monitoring of industrial edge devices with automated data pipeline.</div>
            </div>

            <div v-else class="browser-page">
              <div class="page-header">
                <img src="https://win98icons.alexmeub.com/icons/png/computer_explorer_cool-4.png" width="24" height="24"/>
                <div>
                  <h3>Full-Stack IoT Prototype — Lead Prototyping Engineer</h3>
                  <div class="meta">Raspberry Pi / Multi-Sensor Prototyping &nbsp;|&nbsp; <b>JUN 2026 – JUL 2026</b></div>
                </div>
              </div>
              <fieldset class="xp-fieldset highlight">
                <legend><img class="legend-icon" src="https://win98icons.alexmeub.com/icons/png/computer-4.png"/>Overview</legend>
                <ul class="xp-list">
                  <li><img src="https://win98icons.alexmeub.com/icons/png/desktop-4.png" width="10" height="10"/> Engineered a <b>3D-printed, multi-sensor IoT device</b> using a Raspberry Pi to automatically collect <b>LiDAR, GPS, accelerometer, and camera</b> data for research analysis.</li>
                  <li><img src="https://win98icons.alexmeub.com/icons/png/network_normal_two_pcs-4.png" width="10" height="10"/> Wired and configured hardware and programmed data collection pipeline for synchronized multi-modal acquisition.</li>
                </ul>
              </fieldset>
              <div class="xp-tags">
                <span class="xp-tag">Raspberry Pi</span><span class="xp-tag">LiDAR</span><span class="xp-tag">GPS</span><span class="xp-tag">3D Printing</span>
              </div>
              <div class="xp-infobox"><b><img src="https://win98icons.alexmeub.com/icons/png/desktop-4.png" width="12" height="12"/> Hardware:</b> Custom enclosure, integrated sensor suite for field research.</div>
            </div>
          </div>

          <div class="browser-status"><img src="https://win98icons.alexmeub.com/icons/png/world-4.png" width="12" height="12"/> Done &nbsp;|&nbsp; 2 pages &nbsp;|&nbsp; xp://experience</div>
        </div>
      </template>

      <!-- TECHNICAL PROJECTS - FILE EXPLORER -->
      <template v-else-if="win.id === 'win-projects'">
        <div class="explorer">
          <div class="explorer-toolbar xp-toolbar">
            <button class="xp-tool-btn" :disabled="!explorerOpenedFolder" @click="explorerOpenedFolder=null; explorerOpenedFile=null"><img src="https://win98icons.alexmeub.com/icons/png/directory_closed-4.png" width="12"/> Back</button>
            <button class="xp-tool-btn" disabled><img src="https://win98icons.alexmeub.com/icons/png/directory_closed-4.png" width="12"/> Forward</button>
            <button class="xp-tool-btn"><img src="https://win98icons.alexmeub.com/icons/png/directory_closed-4.png" width="12"/> Up</button>
            <button class="xp-tool-btn"><img src="https://win98icons.alexmeub.com/icons/png/search_file_2-4.png" width="12"/> Search</button>
            <div style="flex:1"></div>
            <button class="xp-tool-btn" @click="explorerOpenedFolder=null; explorerOpenedFile=null"><img src="https://win98icons.alexmeub.com/icons/png/desktop-4.png" width="12"/> My Projects</button>
          </div>
          <div class="explorer-address">
            <span>Address</span>
            <div class="address-bar">
              <img src="https://win98icons.alexmeub.com/icons/png/directory_explorer-4.png" width="12" height="12"/>
              C:\Documents and Settings\Bahaa\My Projects{{ explorerOpenedFolder ? '\\' + explorerOpenedFolder : '' }}{{ explorerOpenedFile ? '\\' + explorerOpenedFile : '' }}
            </div>
          </div>

          <div class="explorer-body">
            <div class="explorer-tree">
              <div class="tree-title"><img src="https://win98icons.alexmeub.com/icons/png/directory_closed-4.png" width="12"/> Folders</div>
              <div class="tree-item"><img src="https://win98icons.alexmeub.com/icons/png/desktop-4.png" width="12"/> Desktop</div>
              <div class="tree-item"><img src="https://win98icons.alexmeub.com/icons/png/directory_closed-4.png" width="12"/> My Documents</div>
              <div class="tree-item expanded" style="padding-left:16px"><img src="https://win98icons.alexmeub.com/icons/png/directory_closed-4.png" width="12"/> <b>My Projects</b></div>
              <div class="tree-item" :class="{selected: explorerOpenedFolder==='DreamStudio'}" style="padding-left:28px" @click="explorerOpenedFolder='DreamStudio'; explorerSelected='DreamStudio'"><img src="https://win98icons.alexmeub.com/icons/png/directory_closed-4.png" width="12"/> DreamStudio</div>
              <div class="tree-item" :class="{selected: explorerOpenedFolder==='B-Sharp'}" style="padding-left:28px" @click="explorerOpenedFolder='B-Sharp'; explorerSelected='B-Sharp'"><img src="https://win98icons.alexmeub.com/icons/png/directory_closed-4.png" width="12"/> B-Sharp</div>
              <div class="tree-item"><img src="https://win98icons.alexmeub.com/icons/png/recycle_bin_empty-4.png" width="12"/> Recycle Bin</div>
            </div>

            <div class="explorer-main">
              <!-- Root: show folders -->
              <div v-if="!explorerOpenedFolder" class="folder-grid">
                <div class="folder-item" :class="{selected: explorerSelected==='DreamStudio'}" @click="explorerSelected='DreamStudio'" @dblclick="explorerOpenedFolder='DreamStudio'">
                  <img src="https://win98icons.alexmeub.com/icons/png/directory_closed_cool-4.png" width="48" height="48"/>
                  <span>DreamStudio</span>
                  <span class="folder-meta">2 files</span>
                </div>
                <div class="folder-item" :class="{selected: explorerSelected==='B-Sharp'}" @click="explorerSelected='B-Sharp'" @dblclick="explorerOpenedFolder='B-Sharp'">
                  <img src="https://win98icons.alexmeub.com/icons/png/directory_closed_cool-4.png" width="48" height="48"/>
                  <span>B-Sharp</span>
                  <span class="folder-meta">2 files</span>
                </div>
              </div>

              <!-- Inside folder: show file -->
              <div v-else class="folder-grid">
                <div class="folder-item back" @click="explorerOpenedFolder=null; explorerOpenedFile=null">
                  <img src="https://win98icons.alexmeub.com/icons/png/directory_closed-4.png" width="32" height="32"/>
                  <span>.. Up</span>
                </div>
                <div class="file-item" :class="{selected: explorerOpenedFile===expectedFileName}" @click="explorerOpenedFile=expectedFileName" @dblclick="openWordpad(explorerOpenedFolder)">
                  <img :src="explorerOpenedFolder==='DreamStudio' ? 'https://win98icons.alexmeub.com/icons/png/notepad_file-2.png' : 'https://win98icons.alexmeub.com/icons/png/notepad_file-2.png'" width="48" height="48"/>
                  <span>{{ expectedFileName }}</span>
                  <span class="folder-meta">{{ explorerOpenedFolder==='DreamStudio' ? '3.6 KB' : '5.0 KB' }}</span>
                </div>
                <div class="file-item" style="opacity:0.7">
                  <img src="https://win98icons.alexmeub.com/icons/png/settings_gear-4.png" width="48" height="48"/>
                  <span>config.ini</span>
                  <span class="folder-meta">1 KB</span>
                </div>
              </div>

              <!-- Hint: double-click file to open in WordPad -->
              <div v-if="explorerOpenedFolder && !explorerOpenedFile" class="xp-infobox" style="margin-top:10px">
                <img src="https://win98icons.alexmeub.com/icons/png/notepad-4.png" width="12" height="12"/> Double-click <b>{{ expectedFileName }}</b> to open in <b>WordPad</b> (parsed view)
              </div>
              <div v-if="explorerOpenedFile" class="xp-infobox" style="margin-top:10px; background:#e8f0ff; border-color:#7f9db9">
                <img src="https://win98icons.alexmeub.com/icons/png/notepad-4.png" width="12" height="12"/> Selected <b>{{ explorerOpenedFile }}</b> — double-click to open in WordPad
              </div>

            </div>
          </div>

          <div class="explorer-status"><span>{{ explorerOpenedFolder ? '1 object selected' : '2 object(s)' }}</span><span>{{ explorerOpenedFolder ? explorerOpenedFolder + ' Folder' : 'My Projects' }}</span></div>
        </div>
      </template>

      <!-- EDUCATION -->
      <template v-else-if="win.id === 'win-education'">
        <div class="xp-content">
          <h3 class="window-heading"><img src="https://win98icons.alexmeub.com/icons/png/help_book_cool-4.png" width="16" height="16"/> Education &amp; Academic Foundation</h3>

          <fieldset class="xp-fieldset highlight">
            <legend><img class="legend-icon" src="https://win98icons.alexmeub.com/icons/png/help_book_cool-4.png"/> Al-Zaytoonah University of Jordan</legend>
            <div class="edu-row">
              <div>
                <b><img src="https://win98icons.alexmeub.com/icons/png/computer_explorer-4.png" width="12" height="12"/> Computer and Communications Engineering</b><br>
                <span class="meta"><img src="https://win98icons.alexmeub.com/icons/png/calendar-4.png" width="10" height="10"/> September 2024 – Current</span>
              </div>
              <div class="gpa-box">
                <div class="gpa-big">3.77 / 4</div>
                <div class="gpa-label">GPA</div>
              </div>
            </div>
            <div class="meta" style="margin-top:6px"><img src="https://win98icons.alexmeub.com/icons/png/help_book_cool-4.png" width="10" height="10"/> National GPA: <b>88.6%</b> — MAY 2023</div>
          </fieldset>

          <fieldset class="xp-fieldset">
            <legend><img class="legend-icon" src="https://win98icons.alexmeub.com/icons/png/notepad-4.png"/> Academic Focus — Relevant Learnt Material</legend>
            <ul class="xp-list">
              <li><img src="https://win98icons.alexmeub.com/icons/png/computer-4.png" width="10" height="10"/> Cloud Computing &amp; Databases</li>
              <li><img src="https://win98icons.alexmeub.com/icons/png/computer_explorer-4.png" width="10" height="10"/> Machine &amp; Deep Learning</li>
              <li><img src="https://win98icons.alexmeub.com/icons/png/network_normal_two_pcs-4.png" width="10" height="10"/> Computer Networks</li>
            </ul>
          </fieldset>

          <fieldset class="xp-fieldset">
            <legend><img class="legend-icon" src="https://win98icons.alexmeub.com/icons/png/users-2.png"/> IEEE Student Branch — 2025</legend>
            <p><img src="https://win98icons.alexmeub.com/icons/png/world-4.png" width="12" height="12"/> <b>ComSoc Chapter Chair</b> — Leadership of technical chapter, events &amp; peer development.</p>
          </fieldset>
        </div>
      </template>

      <!-- SKILLS -->
      <template v-else-if="win.id === 'win-skills'">
        <div class="xp-content skills-grid">
          <fieldset class="xp-fieldset">
            <legend><img class="legend-icon" src="https://win98icons.alexmeub.com/icons/png/world-2.png"/> Spoken Languages</legend>
            <div class="skill-row"><span><img src="https://win98icons.alexmeub.com/icons/png/world-4.png" width="10" height="10"/> Arabic</span><div class="xp-progress"><div class="fill" style="width:100%"></div></div><span class="pct">100%</span></div>
            <div class="skill-row"><span><img src="https://win98icons.alexmeub.com/icons/png/world-4.png" width="10" height="10"/> English</span><div class="xp-progress"><div class="fill" style="width:90%"></div></div><span class="pct">90%</span></div>
            <div class="skill-row"><span><img src="https://win98icons.alexmeub.com/icons/png/world-4.png" width="10" height="10"/> French</span><div class="xp-progress"><div class="fill" style="width:50%"></div></div><span class="pct">50%</span></div>
          </fieldset>

          <fieldset class="xp-fieldset">
            <legend><img class="legend-icon" src="https://win98icons.alexmeub.com/icons/png/notepad-4.png"/> Programming Languages</legend>
            <div class="xp-tags">
              <span class="xp-tag"><img src="https://win98icons.alexmeub.com/icons/png/notepad-4.png" width="12"/> C</span>
              <span class="xp-tag"><img src="https://win98icons.alexmeub.com/icons/png/notepad-4.png" width="12"/> C++</span>
              <span class="xp-tag"><img src="https://win98icons.alexmeub.com/icons/png/notepad-4.png" width="12"/> Python</span>
              <span class="xp-tag"><img src="https://win98icons.alexmeub.com/icons/png/notepad-4.png" width="12"/> Bash</span>
              <span class="xp-tag"><img src="https://win98icons.alexmeub.com/icons/png/notepad_file-2.png" width="12"/> D-lang</span>
            </div>
          </fieldset>

          <fieldset class="xp-fieldset">
            <legend><img class="legend-icon" src="https://win98icons.alexmeub.com/icons/png/computer-4.png"/> Technologies</legend>
            <div class="xp-tags">
              <span class="xp-tag"><img src="https://win98icons.alexmeub.com/icons/png/desktop-4.png" width="12"/> MongoDB</span><span class="xp-tag">MySQL</span><span class="xp-tag">Qt</span><span class="xp-tag">PyQt</span><span class="xp-tag">Flask</span><span class="xp-tag"><img src="https://win98icons.alexmeub.com/icons/png/world-4.png" width="10"/> Node.js</span><span class="xp-tag">Node-RED</span><span class="xp-tag">Docker</span><span class="xp-tag">Telegraf</span><span class="xp-tag"><img src="https://win98icons.alexmeub.com/icons/png/desktop-4.png" width="10"/> Git</span><span class="xp-tag">ESP-IDF</span><span class="xp-tag">PyTorch</span><span class="xp-tag">TensorFlow</span>
            </div>
          </fieldset>

          <fieldset class="xp-fieldset">
            <legend><img class="legend-icon" src="https://win98icons.alexmeub.com/icons/png/computer_explorer-4.png"/> Operating Systems</legend>
            <div class="xp-tags">
              <span class="xp-tag"><img src="https://win98icons.alexmeub.com/icons/png/computer-4.png" width="12"/> Linux</span><span class="xp-tag"><img src="https://win98icons.alexmeub.com/icons/png/windows-4.png" width="12"/> Windows</span>
            </div>
          </fieldset>

          <fieldset class="xp-fieldset">
            <legend><img class="legend-icon" src="https://win98icons.alexmeub.com/icons/png/settings_gear-4.png"/> Software &amp; Agents</legend>
            <div class="xp-tags">
              <span class="xp-tag"><img src="https://win98icons.alexmeub.com/icons/png/notepad-4.png" width="12"/> OpenCode</span><span class="xp-tag"><img src="https://win98icons.alexmeub.com/icons/png/notepad-4.png" width="12"/> VSCode</span><span class="xp-tag"><img src="https://win98icons.alexmeub.com/icons/png/help_book_cool-4.png" width="12"/> Copilot</span>
            </div>
          </fieldset>
        </div>
      </template>

      <!-- CONTACT -->
      <template v-else-if="win.id === 'win-contact'">
        <div class="xp-content win-contact-soft">
          <fieldset class="xp-fieldset">
            <legend><img class="legend-icon" src="https://win98icons.alexmeub.com/icons/png/envelope_closed-1.png"/> Contact</legend>
            <div class="contact-list">
              <div class="contact-row"><span class="contact-label"><img src="https://win98icons.alexmeub.com/icons/png/envelope_closed-1.png" width="12"/> Email:</span> <a href="mailto:bahnofal2005@gmail.com">bahnofal2005@gmail.com</a></div>
              <div class="contact-row"><span class="contact-label"><img src="https://win98icons.alexmeub.com/icons/png/telephony-4.png" width="12"/> Phone:</span> <a href="tel:+962782915528">+962 78 291 5528</a></div>
              <div class="contact-row"><span class="contact-label"><img src="https://win98icons.alexmeub.com/icons/png/world-4.png" width="12"/> GitHub:</span> <a href="https://github.com/Bahfo" target="_blank" rel="noopener">github.com/Bahfo</a></div>
              <div class="contact-row"><span class="contact-label"><img src="https://win98icons.alexmeub.com/icons/png/world-4.png" width="12"/> LinkedIn:</span> <a href="https://linkedin.com/in/bahfonasha" target="_blank" rel="noopener">linkedin.com/in/bahfonasha</a></div>
            </div>
          </fieldset>

          <fieldset class="xp-fieldset">
            <legend><img class="legend-icon" src="https://win98icons.alexmeub.com/icons/png/world-4.png"/> Quick Actions</legend>
            <div class="xp-actions">
              <XpButton @click="copyEmail"><img src="https://win98icons.alexmeub.com/icons/png/notepad_file-2.png" width="12"/> Copy Email</XpButton>
              <a class="xp-btn-link" href="mailto:bahnofal2005@gmail.com"><XpButton><img src="https://win98icons.alexmeub.com/icons/png/envelope_closed-1.png" width="12"/> Send Email</XpButton></a>
            </div>
            <div v-if="copyMsg" class="copy-msg">{{ copyMsg }}</div>
          </fieldset>

          <div class="xp-infobox">
            <b><img src="https://win98icons.alexmeub.com/icons/png/help_book_cool-4.png" width="12"/> Tip:</b> Double-click desktop icons or use the Start menu. Projects opens as File Explorer, Experience as Browser.
          </div>
        </div>
      </template>

      <!-- TETRIS -->
      <template v-else-if="win.id === 'win-tetris'">
        <TetrisGame />
      </template>

      <!-- WORDPAD - parsed MD -->
      <template v-else-if="win.id === 'win-wordpad'">
        <div class="wordpad">
          <div class="wordpad-menu">
            <span>File</span><span>Edit</span><span>View</span><span>Insert</span><span>Format</span><span>Help</span>
          </div>
          <div class="wordpad-toolbar">
            <select disabled><option>Times New Roman</option></select>
            <select disabled><option>12</option></select>
            <button class="wp-btn" disabled><b>B</b></button>
            <button class="wp-btn" disabled><i>I</i></button>
            <button class="wp-btn" disabled><u>U</u></button>
            <span style="flex:1"></span>
            <XpButton @click="copyWordpad" style="padding:2px 6px; font-size:10px">{{ wordpadCopied ? 'Copied!' : 'Copy' }}</XpButton>
          </div>
          <div class="wordpad-ruler"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span></div>
          <div class="wordpad-doc" v-html="wordpadHtml"></div>
          <div class="wordpad-status">
            <span><img src="https://win98icons.alexmeub.com/icons/png/notepad-4.png" width="10"/> WordPad</span>
            <span>{{ wordpadFile ? (wordpadFile==='DreamStudio' ? 'DreamStudio IDE' : 'B-Sharp') : '' }} — {{ wordpadRaw.length }} chars</span>
            <span>Ln 1, Col 1</span>
          </div>
        </div>
      </template>
    </DraggableWindow>
  </div>

  <StartMenu
    :visible="startMenuVisible"
    :items="startMenuItems"
    user="Bahaa Nofal"
    @select="onStartMenuSelect"
  />

  <Taskbar
    :open-windows="openWindows"
    :highest-z-index="highestZIndex"
    start-label="start"
    @toggleStartMenu="toggleStartMenu"
    @taskClick="onTaskClick"
  />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import DesktopIcon from './components/DesktopIcon.vue'
import DraggableWindow from './components/DraggableWindow.vue'
import XpButton from './components/XpButton.vue'
import Taskbar from './components/Taskbar.vue'
import StartMenu from './components/StartMenu.vue'
import dreamStudioMd from './assets/DreamStudio.md?raw'
import bSharpMd from './assets/BSharp.md?raw'
import XpCalendar from './components/XpCalendar.vue'
import TetrisGame from './components/TetrisGame.vue'
import { playOpen, playClose, playClick, playMinimize, playStartup } from './utils/xpSounds.js'

const icons = ref([
  { id: 'icon-about', icon: 'https://win98icons.alexmeub.com/icons/png/computer_explorer-4.png', label: 'About Me', windowId: 'win-about', soft: false },
  { id: 'icon-experience', icon: 'https://win98icons.alexmeub.com/icons/png/msie1-4.png', label: 'Experience', windowId: 'win-experience', soft: true },
  { id: 'icon-projects', icon: 'https://win98icons.alexmeub.com/icons/png/directory_explorer-4.png', label: 'Projects', windowId: 'win-projects', soft: false },
  { id: 'icon-education', icon: 'https://win98icons.alexmeub.com/icons/png/help_book_cool-4.png', label: 'Education', windowId: 'win-education', soft: false },
  { id: 'icon-skills', icon: 'https://win98icons.alexmeub.com/icons/png/settings_gear-4.png', label: 'Skills', windowId: 'win-skills', soft: false },
  { id: 'icon-contact', icon: 'https://win98icons.alexmeub.com/icons/png/envelope_closed-1.png', label: 'Contact', windowId: 'win-contact', soft: true }
])

const windows = ref([
  { id: 'win-about', title: 'About Me — Bahaa Nofal', top: 30, left: 90, isOpen: true, minimized: false, zIndex: 15, width: 420, height: 360 },
  { id: 'win-experience', title: 'Experience - Microsoft Internet Explorer', top: 50, left: 140, isOpen: false, minimized: true, zIndex: 10, width: 460, height: 380 },
  { id: 'win-projects', title: 'My Projects', top: 80, left: 160, isOpen: false, minimized: true, zIndex: 10, width: 520, height: 380 },
  { id: 'win-education', title: 'Education & IEEE', top: 110, left: 260, isOpen: false, minimized: true, zIndex: 10, width: 420, height: 360 },
  { id: 'win-skills', title: 'Skills & Technologies', top: 140, left: 110, isOpen: false, minimized: true, zIndex: 10, width: 420, height: 380 },
  { id: 'win-contact', title: 'Contact Information', top: 170, left: 170, isOpen: false, minimized: true, zIndex: 10, width: 380, height: 300 },
  { id: 'win-tetris', title: 'Tetris - Windows XP Game', top: 40, left: 320, isOpen: false, minimized: true, zIndex: 10, width: 300, height: 480 },
  { id: 'win-wordpad', title: 'Document - WordPad', top: 60, left: 180, isOpen: false, minimized: true, zIndex: 10, width: 560, height: 420 }
])

const highestZIndex = ref(16)
const startMenuVisible = ref(false)
const copyMsg = ref('')

// Explorer state
const explorerOpenedFolder = ref(null)
const explorerOpenedFile = ref(null)
const explorerSelected = ref(null)
const copied = ref(false)
const expectedFileName = computed(() => explorerOpenedFolder.value === 'DreamStudio' ? 'DreamStudio.md' : 'BSharp.md')

// WordPad state for parsed MD
const wordpadFile = ref(null) // 'DreamStudio' | 'B-Sharp'
const wordpadTitle = computed(() => wordpadFile.value ? `${wordpadFile.value === 'DreamStudio' ? 'DreamStudio.md' : 'BSharp.md'} - WordPad` : 'Document - WordPad')
const wordpadRaw = computed(() => wordpadFile.value === 'DreamStudio' ? dreamStudioMd : wordpadFile.value === 'B-Sharp' ? bSharpMd : '')
const wordpadHtml = computed(() => parseMarkdown(wordpadRaw.value))

// Browser state
const activeExpTab = ref('iiot')
const browserRefreshKey = ref(0)

const startMenuItems = [
  { id: 'win-about', label: 'About Me', icon: '👤' },
  { id: 'win-experience', label: 'Experience', icon: '🌐' },
  { id: 'win-projects', label: 'Projects', icon: '📁' },
  { id: 'win-education', label: 'Education', icon: '🎓' },
  { id: 'win-skills', label: 'Skills', icon: '🛠️' },
  { id: 'win-contact', label: 'Contact Me', icon: '✉️' },
  { id: 'win-tetris', label: 'Tetris', icon: '🎮' }
]

const openWindows = computed(() => windows.value.filter(w => w.isOpen))

function bringToFront(id) {
  const win = windows.value.find(w => w.id === id)
  if (!win) return
  highestZIndex.value++
  win.zIndex = highestZIndex.value
  try{ playClick() }catch{}
}

function openWindow(id) {
  const win = windows.value.find(w => w.id === id)
  if (!win) return
  const wasOpen = win.isOpen && !win.minimized
  win.isOpen = true
  win.minimized = false
  bringToFront(id)
  try{ if(!wasOpen) playOpen(); else playClick() }catch{}
  if (id === 'win-projects') {
    // reset explorer to root when reopening if needed
  }
}

function closeWindow(id) {
  const win = windows.value.find(w => w.id === id)
  if (!win) return
  win.isOpen = false
  win.minimized = true
  try{ playClose() }catch{}
}

function toggleMinimize(id) {
  const win = windows.value.find(w => w.id === id)
  if (!win) return
  if (win.minimized) {
    win.minimized = false
    bringToFront(id)
    try{ playOpen() }catch{}
  } else {
    win.minimized = true
    try{ playMinimize() }catch{}
  }
}

function toggleStartMenu() {
  startMenuVisible.value = !startMenuVisible.value
  try{ playClick() }catch{}
}

function onStartMenuSelect(id) {
  openWindow(id)
  startMenuVisible.value = false
}

function onTaskClick(id) {
  try{ playClick() }catch{}
  const win = windows.value.find(w => w.id === id)
  if (!win) return
  const isTop = win.zIndex === highestZIndex.value && !win.minimized
  if (win.minimized) {
    win.minimized = false
    bringToFront(id)
  } else if (isTop) {
    win.minimized = true
  } else {
    bringToFront(id)
    win.minimized = false
  }
}

function copyEmail() {
  const email = 'bahnofal2005@gmail.com'
  if (navigator.clipboard) {
    navigator.clipboard.writeText(email).then(() => {
      copyMsg.value = 'Copied: ' + email
      setTimeout(() => copyMsg.value = '', 2000)
    })
  } else {
    copyMsg.value = email
  }
}

function copyFileContent() {
  const text = explorerOpenedFolder.value === 'DreamStudio' ? dreamStudioMd : bSharpMd
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      copied.value = true
      setTimeout(()=> copied.value=false, 1500)
    })
  }
}

const wordpadCopied = ref(false)
function copyWordpad(){
  if (navigator.clipboard) {
    navigator.clipboard.writeText(wordpadRaw.value).then(()=>{ wordpadCopied.value=true; setTimeout(()=> wordpadCopied.value=false,1500)})
  }
}

function openWordpad(file) {
  wordpadFile.value = file
  const win = windows.value.find(w => w.id === 'win-wordpad')
  if (win) {
    win.title = file === 'DreamStudio' ? 'DreamStudio.md - WordPad' : 'BSharp.md - WordPad'
  }
  openWindow('win-wordpad')
}

function parseMarkdown(md) {
  if (!md) return ''
  let html = md
  // Preserve HTML tags like <h1 ...> - do not escape
  const codeBlocks = []
  // Extract fenced code blocks
  html = html.replace(/```\s*(\w*)\n([\s\S]*?)```/g, (m, lang, code) => {
    const placeholder = `@@CODEBLOCK${codeBlocks.length}@@`
    codeBlocks.push(`<pre class="wp-code"><code>${escapeHtml(code.trim())}</code></pre>`)
    return placeholder
  })
  // Inline code `code`
  html = html.replace(/`([^`]+)`/g, '<code class="wp-inline-code">$1</code>')
  // Images ![alt](url) -> must do before links
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="wp-img" />')
  // Links [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
  // Horizontal rule
  html = html.replace(/^---+$|^\*\*\*+$|^___+$/gm, '<hr/>')
  // Headings ###### to #
  html = html.replace(/^######\s+(.*)$/gm, '<h6>$1</h6>')
  html = html.replace(/^#####\s+(.*)$/gm, '<h5>$1</h5>')
  html = html.replace(/^####\s+(.*)$/gm, '<h4>$1</h4>')
  html = html.replace(/^###\s+(.*)$/gm, '<h3>$1</h3>')
  html = html.replace(/^##\s+(.*)$/gm, '<h2>$1</h2>')
  html = html.replace(/^#\s+(.*)$/gm, '<h1>$1</h1>')
  // Bold **text**
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  // Italic *text* or _text_ (avoid double)
  html = html.replace(/(?<!\*)\*([^\*\n]+)\*(?!\*)/g, '<em>$1</em>')
  // Blockquote
  html = html.replace(/^>\s+(.*)$/gm, '<blockquote>$1</blockquote>')
  // Unordered lists
  html = html.replace(/^(\s*[-\*]\s+.+(?:\n\s*[-\*]\s+.+)*)/gm, (m) => {
    const items = m.trim().split(/\n/).map(l => l.replace(/^\s*[-\*]\s+/, '').trim()).map(i=>`<li>${i}</li>`).join('')
    return `<ul>${items}</ul>`
  })
  // Ordered lists 1. 2.
  html = html.replace(/^(\s*\d+\.\s+.+(?:\n\s*\d+\.\s+.+)*)/gm, (m) => {
    const items = m.trim().split(/\n/).map(l => l.replace(/^\s*\d+\.\s+/, '').trim()).map(i=>`<li>${i}</li>`).join('')
    return `<ol>${items}</ol>`
  })
  // Paragraphs: split by double newline
  const blocks = html.split(/\n\n+/)
  html = blocks.map(block => {
    const trimmed = block.trim()
    if (!trimmed) return ''
    if (trimmed.startsWith('<h') || trimmed.startsWith('<ul') || trimmed.startsWith('<ol') || trimmed.startsWith('<pre') || trimmed.startsWith('<blockquote') || trimmed.startsWith('<hr') || trimmed.startsWith('<img') || trimmed.startsWith('@@CODEBLOCK')) {
      return trimmed
    }
    // Keep existing HTML tags like <h1 align...>
    if (trimmed.startsWith('<')) return trimmed
    // Wrap in p, preserving <br> for single line breaks
    return `<p>${trimmed.replace(/\n/g, '<br/>')}</p>`
  }).join('\n')
  // Restore code blocks
  codeBlocks.forEach((codeHtml, i) => {
    html = html.replace(`@@CODEBLOCK${i}@@`, codeHtml)
  })
  // Clean up multiple <br> inside lists etc
  return html
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
}

function onDesktopClick(e) {
  if (e.target.classList.contains('desktop')) {
    startMenuVisible.value = false
  }
}

onMounted(() => {
  // XP startup chime after first user interaction is required by browser; try now and also on first click
  setTimeout(()=>{ try{ playStartup() }catch{} }, 300)
  const once = () => { try{ playStartup() }catch{}; window.removeEventListener('click', once) }
  window.addEventListener('click', once, {once: true})
})

defineExpose({ openWindow, closeWindow, windows, icons })
</script>

<style>
.xp-content { font-family: Tahoma, "Segoe UI", sans-serif; color:#000; line-height:1.5; }
.about-header { display:flex; justify-content:space-between; align-items:flex-start; gap:12px; margin-bottom:10px; border-bottom:2px ridge #ece9d8; padding-bottom:10px; }
.about-name { margin:0; font-size:20px; color:#003dd6; text-shadow:1px 1px 0 #fff; }
.about-title { font-size:10px; letter-spacing:0.5px; color:#5a5a5a; font-weight:bold; text-transform:uppercase; margin-top:4px; }
.about-badge { width:44px; height:44px; background:linear-gradient(to bottom,#0058ee,#003dd6); color:white; display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:16px; border:2px outset #ece9d8; flex-shrink:0; }
.quote { font-style:italic; color:#333; background:#ffffe1; border:1px solid #d4d0c8; padding:6px 8px; margin:8px 0; font-size:12px; }
.window-heading { margin:0 0 8px 0; font-size:14px; color:#003dd6; border-bottom:1px solid #d4d0c8; padding-bottom:4px; display:flex; align-items:center; gap:6px; }
.xp-fieldset { border:1px solid #7f9db9; border-radius:4px; background:#ece9d8; padding:8px 10px; margin:10px 0; }
.xp-fieldset.highlight { background:#fff; border:2px groove #ece9d8; }
.xp-fieldset legend { background:#ece9d8; padding:0 6px; font-size:11px; font-weight:bold; color:#003dd6; display:flex; align-items:center; gap:4px; }
.legend-icon { width:12px; height:12px; vertical-align:middle; }
.meta { font-size:11px; color:#555; margin:4px 0 6px 0; }
.xp-list { margin:4px 0 0 18px; padding:0; font-size:12px; }
.xp-list li { margin-bottom:6px; }
.xp-tags { display:flex; flex-wrap:wrap; gap:6px; margin-top:6px; }
.xp-tag { font-size:10px; background:linear-gradient(to bottom,#ffffff,#d4d0c8); border:1px solid #7f9db9; border-radius:3px; padding:2px 6px; box-shadow:1px 1px 0 #fff inset; display:flex; align-items:center; gap:4px; }
.xp-actions { display:flex; flex-wrap:wrap; gap:8px; margin-top:10px; }
.edu-row { display:flex; justify-content:space-between; align-items:center; gap:12px; }
.gpa-box { text-align:center; background:#fff; border:1px solid #7f9db9; padding:6px 10px; min-width:70px; }
.gpa-big { font-size:16px; font-weight:bold; color:#003dd6; }
.gpa-label { font-size:10px; color:#666; }
.skills-grid .xp-fieldset { margin:8px 0; }
.skill-row { display:flex; align-items:center; gap:8px; font-size:12px; margin:6px 0; }
.skill-row span:first-child { width:75px; display:flex; align-items:center; gap:4px; }
.xp-progress { flex:1; height:14px; background:#fff; border:1px inset #d4d0c8; padding:1px; overflow:hidden; }
.xp-progress .fill { height:100%; background:linear-gradient(to bottom,#3c81f5 0%,#0058ee 50%,#003dd6 100%); }
.pct { width:34px; text-align:right; font-size:11px; color:#333; }
.contact-list { display:flex; flex-direction:column; gap:6px; font-size:12px; }
.contact-row { display:flex; gap:8px; align-items:center; flex-wrap:wrap; }
.contact-label { font-weight:bold; min-width:80px; color:#003dd6; display:flex; align-items:center; gap:4px; }
.contact-row a { color:#003dd6; text-decoration:underline; word-break:break-all; }
.xp-infobox { margin-top:10px; background:#ffffe1; border:1px solid #000; padding:6px 8px; font-size:11px; }
.copy-msg { margin-top:6px; font-size:11px; color:#0a7a0a; background:#eaffea; border:1px solid #a0d0a0; padding:4px 6px; }
.xp-btn-link { text-decoration:none; }

/* Explorer */
.explorer { font-family: Tahoma, sans-serif; font-size:12px; background:#ece9d8; border:1px solid #7f9db9; }
.xp-toolbar { display:flex; align-items:center; gap:4px; background:linear-gradient(to bottom,#ece9d8,#d4d0c8); border-bottom:1px solid #7f9db9; padding:4px; flex-wrap:wrap; }
.xp-tool-btn { background:linear-gradient(to bottom,#fff,#ece9d8); border:1px solid #003c74; border-radius:2px; padding:2px 6px; font-size:11px; cursor:pointer; display:flex; align-items:center; gap:4px; }
.xp-tool-btn:disabled { opacity:0.5; cursor:default; }
.explorer-address { display:flex; align-items:center; gap:6px; padding:4px 6px; background:#ece9d8; border-bottom:1px solid #7f9db9; font-size:11px; }
.address-bar { flex:1; background:white; border:1px inset #d4d0c8; padding:2px 6px; display:flex; align-items:center; gap:6px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.explorer-body { display:flex; min-height:220px; background:white; }
.explorer-tree { width:140px; background:#fff; border-right:1px solid #7f9db9; padding:6px; font-size:11px; overflow:auto; }
.tree-title { font-weight:bold; color:#003dd6; border-bottom:1px solid #d4d0c8; padding-bottom:4px; margin-bottom:6px; display:flex; align-items:center; gap:4px; }
.tree-item { padding:2px 4px; display:flex; align-items:center; gap:6px; cursor:pointer; white-space:nowrap; }
.tree-item.selected { background:#3168d8; color:white; }
.tree-item.expanded { font-weight:bold; }
.explorer-main { flex:1; padding:8px; overflow:auto; background:#fff; }
.folder-grid { display:flex; flex-wrap:wrap; gap:14px; }
.folder-item, .file-item { width:80px; display:flex; flex-direction:column; align-items:center; text-align:center; gap:4px; padding:6px; border:1px solid transparent; cursor:pointer; font-size:11px; }
.folder-item.selected, .file-item.selected { background:#3168d8; color:white; border:1px dotted #fff; }
.folder-item.back { opacity:0.8; }
.folder-meta { font-size:10px; color:#666; }
.file-item.selected .folder-meta { color:#e0e0ff; }
.notepad-preview { margin-top:10px; border:2px ridge #ece9d8; background:#fff; }
.notepad-title { background:linear-gradient(to bottom,#0058ee 0%,#3593ff 10%,#0058ee 90%,#003dd6 100%); color:white; padding:3px 6px; display:flex; align-items:center; gap:6px; font-size:11px; font-weight:bold; }
.notepad-close { margin-left:auto; background:linear-gradient(to bottom,#e16548,#c4381c); border:1px solid white; color:white; width:16px; height:16px; font-size:10px; cursor:pointer; }
.notepad-meta { background:#ece9d8; border-bottom:1px solid #7f9db9; padding:6px 8px; font-size:11px; display:grid; grid-template-columns:1fr 1fr; gap:4px; }
.meta-row span { font-weight:bold; color:#003dd6; }
.notepad-content { background:white; color:#000; padding:8px; font-family:"Courier New", monospace; font-size:11px; white-space:pre-wrap; word-break:break-word; max-height:220px; overflow:auto; margin:0; border:none; }
.notepad-actions { padding:6px; background:#ece9d8; border-top:1px solid #7f9db9; display:flex; gap:6px; }
.explorer-status { display:flex; justify-content:space-between; background:#ece9d8; border-top:1px solid #7f9db9; padding:3px 6px; font-size:10px; color:#333; }

/* Browser */
.browser { font-family: Tahoma, sans-serif; background:#ece9d8; border:1px solid #7f9db9; }
.browser-toolbar { display:flex; align-items:center; gap:4px; flex-wrap:wrap; }
.browser-address { display:flex; align-items:center; gap:6px; flex:1; min-width:160px; }
.browser-tabs { display:flex; gap:2px; background:#d4d0c8; padding:4px 4px 0 4px; border-bottom:1px solid #7f9db9; }
.browser-tab { background:linear-gradient(to bottom,#fff,#d4d0c8); border:1px solid #7f9db9; border-bottom:none; border-top-left-radius:4px; border-top-right-radius:4px; padding:4px 10px; font-size:11px; cursor:pointer; display:flex; align-items:center; gap:6px; color:#333; }
.browser-tab.active { background:#fff; font-weight:bold; color:#000; border-bottom:1px solid #fff; margin-bottom:-1px; }
.browser-content { background:white; padding:10px; min-height:240px; border:1px solid #7f9db9; border-top:none; }
.page-header { display:flex; gap:10px; align-items:flex-start; border-bottom:2px ridge #ece9d8; padding-bottom:8px; margin-bottom:8px; }
.page-header h3 { margin:0; font-size:13px; color:#003dd6; }
.browser-status { background:#ece9d8; border-top:1px solid #7f9db9; padding:3px 6px; font-size:10px; display:flex; align-items:center; gap:6px; }
@media (max-width:768px){ .explorer-body{ flex-direction:column;} .explorer-tree{ width:100%; border-right:none; border-bottom:1px solid #7f9db9;} .notepad-meta{ grid-template-columns:1fr; } }

/* Desktop right sidebar: calendar + tetris */
.desktop { position: relative; }
.desktop-right {
  position: absolute;
  right: 12px;
  top: 12px;
  display:flex;
  flex-direction:column;
  gap:12px;
  z-index:5;
  align-items: flex-end;
}
.tetris-launcher {
  width: 190px;
  background: linear-gradient(to bottom, #ffffff 0%, #ece9d8 100%);
  border: 1px solid #0831d9;
  border-radius: 4px;
  box-shadow: inset 1px 1px 0 rgba(255,255,255,0.8), 1px 2px 6px rgba(0,0,0,0.25);
  padding:10px;
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:4px;
  cursor:pointer;
  font-family: Tahoma, sans-serif;
  font-weight:bold;
  color:#003dd6;
  text-shadow: 0 1px 0 rgba(255,255,255,0.8);
  transition: filter 0.12s, transform 0.08s;
}
.tetris-launcher:hover { filter: brightness(1.06); transform: translateY(-1px); }
.tetris-launcher:active { transform: translateY(1px); filter: brightness(0.96); }
.tetris-launcher small { font-weight:normal; font-size:10px; color:#333; }

/* Soften contact & experience inline icons to match other icons */
.xp-content .soft-icon, .browser .soft-icon, .explorer .soft-icon {
  filter: drop-shadow(1px 1px 1px rgba(0,0,0,0.35)) saturate(0.88) brightness(1.06);
}
.legend-icon { filter: drop-shadow(0 1px 0 rgba(255,255,255,0.8)) saturate(0.9); }
@media (max-width: 768px){
  .desktop-right { position: static; margin-top: 10px; width:100%; align-items:center; }
  .tetris-launcher { width: 90%; max-width:300px; }
}


/* Soften contact & experience icons to match other icons' gentle palette */
.win-contact-soft img, .win-experience-soft img {
  filter: drop-shadow(1px 1px 1px rgba(0,0,0,0.38)) saturate(0.86) brightness(1.07) contrast(0.97);
  opacity: 0.97;
}


/* WordPad - XP */
.wordpad { background:#ece9d8; border:1px solid #7f9db9; font-family: Tahoma, sans-serif; display:flex; flex-direction:column; height: 100%; min-height: 320px; }
.wordpad-menu { display:flex; gap:12px; padding:3px 8px; font-size:11px; background:#ece9d8; border-bottom:1px solid #aca899; }
.wordpad-menu span { cursor:default; }
.wordpad-menu span:hover { background:#3168d8; color:white; }
.wordpad-toolbar { display:flex; gap:4px; align-items:center; padding:4px 6px; background: linear-gradient(to bottom, #ece9d8, #d4d0c8); border-bottom:1px solid #7f9db9; }
.wordpad-toolbar select { font-size:10px; border:1px solid #7f9db9; background:white; padding:1px; }
.wp-btn { width:22px; height:20px; background: linear-gradient(to bottom, #fff, #d4d0c8); border:1px solid #7f9db9; border-radius:2px; font-size:11px; cursor:default; }
.wordpad-ruler { height:14px; background:#fff; border-bottom:1px solid #aca899; display:flex; justify-content:space-around; font-size:9px; color:#999; padding:0 12px; line-height:14px; }
.wordpad-doc { flex:1; overflow:auto; background:white; margin:4px; border:1px inset #d4d0c8; padding:12px 16px; font-family: 'Times New Roman', Times, serif; font-size:13px; line-height:1.6; color:#000; }
.wordpad-doc h1 { font-size:22px; color:#003dd6; border-bottom:2px solid #003dd6; margin:12px 0 8px 0; padding-bottom:4px; }
.wordpad-doc h2 { font-size:18px; color:#0052d4; margin:10px 0 6px 0; }
.wordpad-doc h3 { font-size:15px; color:#333; margin:8px 0 4px 0; }
.wordpad-doc h4 { font-size:13px; color:#555; }
.wordpad-doc p { margin:6px 0; }
.wordpad-doc a { color:#0052d4; text-decoration:underline; }
.wordpad-doc img.wp-img { max-width:100%; vertical-align:middle; margin:4px 2px; border:1px solid #d4d0c8; }
.wordpad-doc code.wp-inline-code { background:#f0f0f0; border:1px solid #d4d0c8; padding:0 3px; font-family:'Courier New', monospace; font-size:12px; }
.wordpad-doc pre.wp-code { background:#f8f8f0; border:1px solid #aca899; padding:8px; overflow:auto; font-size:11px; margin:8px 0; }
.wordpad-doc ul, .wordpad-doc ol { margin:6px 0 6px 18px; }
.wordpad-doc blockquote { border-left:3px solid #0052d4; margin:6px 0; padding:4px 8px; background:#f0f6ff; color:#333; }
.wordpad-doc hr { border:none; border-top:1px solid #aca899; margin:8px 0; }
.wordpad-status { display:flex; justify-content:space-between; background:#ece9d8; border-top:1px solid #7f9db9; padding:2px 6px; font-size:10px; color:#333; }

</style>
