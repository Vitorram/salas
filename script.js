// Dados simulados (você pode alimentar com JSON exportado da planilha)
const dadosSalas = {
  "9A": [
    { nota: 10 },
  ],
  "9B": [
    { nota: 5 },
  ],
  "9C": [
    { nota: 3 },
  ],
  "9D": [
    { nota: 1 },
  ],
  "9E": [
    { nota: 5.1 },
  ],
};

// Função para preencher tabela na página sala.html
function mostrarSala(sala) {
  const titulo = document.getElementById("titulo-sala");
  const tbody = document.querySelector("#tabela-alunos tbody");
  titulo.textContent = `Sala ${sala}`;
  tbody.innerHTML = "";

  const alunos = dadosSalas[sala] || [];
  alunos.forEach((aluno) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${aluno.nome || "Aluno"}</td><td>${aluno.nota.toFixed(1)}</td>`;
    tbody.appendChild(tr);
  });
}

// Função para mostrar melhor sala na melhor.html
function mostrarMelhorSala() {
  let melhorSala = null;
  let melhorMedia = 0;

  for (const sala in dadosSalas) {
    const alunos = dadosSalas[sala];
    const mediaSala =
      alunos.reduce((acc, cur) => acc + cur.nota, 0) / alunos.length;

    if (mediaSala > melhorMedia) {
      melhorMedia = mediaSala;
      melhorSala = sala;
    }
  }

  document.getElementById("nome-melhor-sala").textContent = `Sala ${melhorSala}`;
  document.getElementById("media-melhor-sala").textContent = melhorMedia.toFixed(2);
}

// Funções para gráficos na página index.html
function criarGraficos() {
  const ctxPie = document.getElementById("pieChart").getContext("2d");
  const ctxBar = document.getElementById("barChart").getContext("2d");

  const labels = Object.keys(dadosSalas);
  const medias = labels.map(
    (sala) =>
      dadosSalas[sala].reduce((acc, cur) => acc + cur.nota, 0) /
      dadosSalas[sala].length
  );

  new Chart(ctxPie, {
    type: "pie",
    data: {
      labels,
      datasets: [
        {
          label: "Média das salas",
          data: medias,
          backgroundColor: ["#63cdda", "#016812ff", "#c028ceff", "#1c758a", "#741421ff"],
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          labels: {
            font: {
              size: 20, // Aumenta o tamanho da fonte da legenda
              weight: 'normal',
            }
          }
        },
        tooltip: {
          bodyFont: {
            size: 18, // Aumenta o tamanho do texto do tooltip
          }
        }
      }
    }
  });

  new Chart(ctxBar, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Média das salas",
          data: medias,
          backgroundColor: "#27a09e",
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 10,
          ticks: {
            font: {
              size: 18, // Aumenta o tamanho da fonte dos valores no eixo Y
              weight: 'normal',
            },
          },
        },
        x: {
          ticks: {
            font: {
              size: 18, // Aumenta o tamanho da fonte dos labels no eixo X
              weight: 'normal',
            },
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            font: {
              size: 20, // Aumenta o tamanho da legenda do gráfico
              weight: 'normal',
            }
          }
        },
        tooltip: {
          bodyFont: {
            size: 18, // Aumenta o tamanho do texto do tooltip
          }
        }
      }
    },
  });
}

// Inicialização dependendo da página
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("pieChart")) {
    criarGraficos();
  }
  if (document.getElementById("titulo-sala")) {
    // por padrão mostra sala 9A
    mostrarSala("9A");

    // adiciona evento aos botões
    document.querySelectorAll("#botoes-salas button").forEach((btn) => {
      btn.addEventListener("click", () => {
        mostrarSala(btn.dataset.sala);
      });
    });
  }
  if (document.getElementById("melhor-sala")) {
    mostrarMelhorSala();
  }
});
