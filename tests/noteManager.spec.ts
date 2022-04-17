import "mocha";
import { expect } from "chai";
import { NoteManager } from "../src/noteManager";

describe("Class NoteManager Tests", () => {
  const noteManager = new NoteManager();
  
  it('Create NoteManager', () => {
    expect(noteManager).instanceOf(NoteManager);
  });

  // Añade una nota
  it('Test addNote', () => {
    expect(noteManager.addNote("NoteManagerTest", "Title Test", "Body Test", "green")).to.eql(true)
  })
  // Añade una nota con un color invalido
  it('Test addNote', () => {
    expect(noteManager.addNote("NoteManagerTest", "Title Test Color", "Body Test", "verde")).to.eql(true)
  })
  // Intenta añadir la misma nota
  it('Test addNote existing', () => {
    expect(noteManager.addNote("NoteManagerTest", "Title Test", "Body Test", "green")).to.eql(false)
  })

  // Modifica una nota
  it('Test modifyNote', () => {
    expect(noteManager.modifyNote("NoteManagerTest", "Title Test", "Body Modify Test", "green")).to.eql(true)
  })
  // Intenta modificar una nota no existente
  it('Test modifyNote NO existing', () => {
    expect(noteManager.modifyNote("NoteManagerTest", "Title Test 2", "Body Test", "green")).to.eql(false)
  })
  
  // Muestra las notas de un usuario
  it('Test listNotes', () => {
    expect(noteManager.listNotes("NoteManagerTest")).to.eql(true)
  })
  // Intenta mostrar las notas de un usuario no existente
  it('Test listNotes User No existing', () => {
    expect(noteManager.listNotes("NoteManagerTest_")).to.eql(false)
  })

  // Lee una nota
  it('Test readNote', () => {
    expect(noteManager.readNote("NoteManagerTest", "Title Test")).to.eql(true)
  })
  // Lee una nota con un color invalido
  it('Test readNote', () => {
    expect(noteManager.readNote("NoteManagerTest", "Title Test Color")).to.eql(true)
  })
  // Lee una nota no existente
  it('Test readNote No existing', () => {
    expect(noteManager.readNote("NoteManagerTest", "No Title Test")).to.eql(false)
  })

  // Borra una nota
  it('Test removeNote', () => {
    expect(noteManager.removeNote("NoteManagerTest", "Title Test")).to.eql(true)
  })
  // Intenta borrar una nota no existente
  it('Test removeNote NO existing', () => {
    expect(noteManager.removeNote("NoteManagerTest", "No Title Test")).to.eql(false)
  }) 

  it("Clear data users", () => {
    noteManager.clearDataUser("NoteManagerTest")
    noteManager.clearDataUser("NoteManagerTest_")
  })
});
