# Bomberman

### Fase 1
<br>
<ul>
  <li><b>Nombre del juego:</b> Bomberman </li>
  <li><b>Descripción de la temática del juego:</b>
     <br>
     Cada jugador deberá mover su personaje a través del laberinto evitando las explosiones de las bombas de sus contrincantes y colocar  sus propias bombas estratégicamente para derrotarlos. Al romper el muro, pueden aparecer objetos que mejorarán nuestras habilidades (mayor velocidad, más munición y bombas con más rango).
     <br>
     <b>Reglas del juego:</b>
     <ul>
        <li>Cada jugador tiene una vida por partida.</li>
        <li>Los jugadores sólo pueden moverse en horizontal y vertical, no podrán atravesar los muros.</li>
        <li>Cada jugador tendrá un nº máximo de bombas que podrá poner a la vez, ese número podrá incrementar con bonificadores.</li>
        <li>Las bombas sólo explotan en horizontal y vertical, con un rango ampliable por bonificadores y limitado por los muros.</li>
        <li>Las bombas pueden matar a cualquier personaje, inclusive a aquel que la ha puesto.</li>
        <li>Hay bloques de piedra que no se pueden romper con nada.</li>
        <li>Los personajes pueden atravesarse entre sí, pero no las bombas y bloques.</li>
   </ul>
   <br>
  </li>
    
  <li><b>Integrantes del equipo de desarrollo:</b>
  <ul>
    <li><b>Nombre y apellidos:</b> Andrés Felipe García</li>
    <li><b>Correo de URJC:</b>  a.felipeg@alumnos.urjc.es</li>
    <li><b>Cuenta de github:</b> luk224</li>
  </ul>
  <br>
  <ul>
    <li><b>Nombre y apellidos:</b> Elena Beatriz Chueca Morales</li>
    <li><b>Correo de URJC:</b> eb.chueca@alumnos.urjc.es</li>
    <li><b>Cuenta de github:</b> ElenaChueca</li>
  </ul>
  <br>
  <ul>
    <li><b>Nombre y apellidos:</b> Raquel Gastón Vicente</li>
    <li><b>Correo de URJC:</b> r.gaston@alumnos.urjc.es</li>
    <li><b>Cuenta de github:</b> rgastonv</li>
  </ul>
  
  <br>
  <li><b><a href="http://trello.com/b/Pxu6exQQ/juegos-en-red">Tablero de Trello</a></b></li>
  
</ul>
<br>

  ### Fase 2
<ul>
  <li><b>Referencias externas:</b>
  <br>
  <ul>
    <li><b>Imágenes:</b>
      <ul>
        <li><a href="https://www.deviantart.com/art/3D-Bomberman-Custom-Sheet-127714831">Sprites</a> de <a href="https://kylontario.deviantart.com/">Kylontario</a> en DeviantArt.
        </li>
        <li><a href="https://www.spriters-resource.com/pc_computer/atomicbomberman/sheet/9768/">Sprites</a> de <a href="https://www.spriters-resource.com/submitter/Black+Squirrel/">Black Squirrel</a> en spriters-resource.
        </li>
        <li><a href="http://bomberman.wikia.com/wiki/File:Bomberman-icon.png">Icono</a> de la <a href="http://bomberman.wikia.com/">Wiki</a>.
        </li>
        <li><a href="http://nintendo-online.de/switch/news/28200/nintendo-switch-preview-event-wir-zocken-super-bomberman-r">Fondo</a> de <a href="http://nintendo-online.de/">Nintendo Alemania</a>.
        </li>
      </ul>
    </li>
    <li><b>Audios:</b>
      <ul>
        <li><a href="https://freesound.org/people/sharesynth/sounds/344506/">Bomba</a> de <a href="https://freesound.org/people/sharesynth/">sharesynth</a> en freesound.org.
        </li>
        <li><a href="https://freesound.org/people/plasterbrain/sounds/394466/">Muerte</a> de <a href="https://freesound.org/people/plasterbrain/">plasterbrain</a> en freesound.org.
        </li>
        <li><a href="https://freesound.org/people/Quistard/sounds/231955/">Colocar bomba</a> de <a href="https://freesound.org/people/Quistard/">Quistard</a> en freesound.org.
        </li>
        <li><a href="https://freesound.org/people/GameAudio/sounds/220173/">Power-up</a> de <a href="https://freesound.org/people/GameAudio/">GameAudio</a> en freesound.org.
        </li>
        <li><a href="https://freesound.org/people/InspectorJ/sounds/403018/">Click</a> de <a href="https://freesound.org/people/InspectorJ/">InspectorJ</a> en freesound.org.
        </li>
        <li><a href="https://freesound.org/people/LittleRobotSoundFactory/sounds/270333/">Ganar</a> de <a href="https://freesound.org/people/LittleRobotSoundFactory/">LittleRobotSoundFactory</a> en freesound.org.
        </li>
        <li><a href="https://freesound.org/people/steel2008/sounds/231277/">Cuenta atrás</a> de <a href="https://freesound.org/people/steel2008/">steel2008</a> en freesound.org.
        </li>
      </ul>
    </li>
    <li><b>Fuente:</b>
      <ul>
        <li><a href="http://www.styleseven.com/php/get_product.php?product=Light%20Pixel-7">Light Pixel-7</a> de Sizenko Alexander en <a href="http://www.styleseven.com">Style-7</a>.
        </li>
      </ul>
    </li>
  </ul>
  <br>
  <li><b>Capturas de las pantallas:</b></li>

  <p>Al abrir el juego, nos da la bienvenida una pantalla de inicio con cuatro botones para acceder a las demás. El archivo html de esta pantalla se llama index, para que el servidor la abra por defecto.</p></ul>

  ![Inicio](https://raw.githubusercontent.com/rgastonv/BombermanGame/master/img/home_img.png)

  <br>

  <ul><p>El primer botón nos lleva a la pantalla de juego. El lienzo de Phaser se crea en un div que está centrado en la pantalla y que contiene, a su vez, dos botones: uno para reiniciar la partida, y otro para volver a la pantalla de inicio. Mediante entrada por teclado dos usuarios pueden jugar una partida de Bomberman en este lienzo, utilizando distintas teclas en un mismo ordenador. El jugador 1 usará ASDW para moverse y Q para colocar bombas; el jugador 2 usará JKLI y U respectivamente.<br>
  El mapa de juego genera los bloques de ladrillo aleatoriamente, de manera que cada partida será distinta a la anterior.</p></ul>
  
  ![Juego](https://raw.githubusercontent.com/rgastonv/BombermanGame/master/img/inGame_img.png)

  <br>

  <ul><p>La pantalla de records presenta una tabla de las puntuaciones más altas (en número de partidas ganadas) ordenadas en una tabla. Ya que por lo pronto el juego solo funciona en local y no se recoge el nombre de los jugadores, la información que se muestra es un <i>placeholder</i> a sustituir en el futuro. Se muestran en una tabla generada con bootstrap.</p></ul>
  
  ![Records](https://raw.githubusercontent.com/rgastonv/BombermanGame/master/img/records_img.png)

  <br>

  <ul><p>La pantalla de tutorial explica brevemente al usuario el funcionamiento del juego y los distintos ítems. Se muestran en una tabla generada con bootstrap.</p></ul>
  
  ![Tutorial](https://raw.githubusercontent.com/rgastonv/BombermanGame/master/img/tutorial_img.png)

  <br>

  <ul><p>La pantalla about recoge nuestros nombres y correos de la universidad. Se muestran en una tabla generada con bootstrap.
  </p></ul>
  
  ![Sobre nosotros](https://raw.githubusercontent.com/rgastonv/BombermanGame/master/img/about_img.png)


  <br>
  <ul><li><b>Diagrama de navegación:</b></li>

  <p>A continuación un diagrama que muestra la navegación entre pantallas mediante los diferentes botones.
  </p></ul>
  
  ![Diagrama](https://raw.githubusercontent.com/rgastonv/BombermanGame/master/img/diagramaDeNavegación.png)
  
  <br>


  <ul><li><b>Diseño del juego:</b>
  
  <p>Como añadido a lo explicado en la primera fase:</p>
      <ul>
        <li>La versión del juego en esta fase (en local) tendrá solo dos jugadores, ambos controlando a su personaje desde la misma máquina.</li>
        <li>En el escenario hay túneles en los que los jugadores pueden colocar bombas a escondidas.</li>
        <li>La destrucción de bloques de ladrillo generan power-ups con una probabilidad del 50%.</li>
        <li>Los power-ups pueden ser de seis tipos diferentes, todos con la misma probabilidad.</li>
        <ul>
            <li>Velocidad+: aumenta la velocidad del personaje.</li>
            <li>Bombas+: aumenta en una unidad el número de bombas de que dispone el personaje.</li>
            <li>Rango+: aumenta en una casilla el rango de alcance de las bombas del personaje.</li>
            <li>Velocidad-: disminuye la velocidad del personaje (hay un mínimo del que nunca se podrá bajar).</li>
            <li>Bombas-: disminuye en una unidad el número de bombas de que dispone el personaje (siempre tendrá como mínimo una bomba).</li>
            <li>Rango-: disminuye en una casilla el rango de alcance de las bombas del personaje (siempre será de como mínimo una casilla).</li>
        </ul>
      </ul>
      </li>
  

  </ul>
