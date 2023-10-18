/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.controllers;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;
import edu.eci.arsw.blueprints.persistence.BlueprintNotFoundException;
import edu.eci.arsw.blueprints.persistence.BlueprintPersistenceException;
import edu.eci.arsw.blueprints.services.BlueprintsServices;

/**
 *
 * @author hcadavid
 */
@RestController
public class BlueprintAPIController {
    @Autowired
    BlueprintsServices bps;

    @RequestMapping(value = "/blueprints", method = RequestMethod.GET)
    public ResponseEntity<?> handlerGetBlueprints() {
        Set<Blueprint> blueprints = null;
        try {
            // obtener datos que se enviarán a través del API
            blueprints = bps.getAllBlueprints();
            return new ResponseEntity<>(blueprints, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            Logger.getLogger(BlueprintAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("Error " + ex.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/blueprints/{author}", method = RequestMethod.GET)
    public ResponseEntity<?> handlerGetBlueprintsByAuthor(@PathVariable String author){
        Set<Blueprint> blueprints = null;
        try {
            blueprints = bps.getBlueprintsByAuthor(author);
            if(blueprints.isEmpty()){
                return new ResponseEntity<>("404 Not Found", HttpStatus.NOT_FOUND);
            }else{
                return new ResponseEntity<>(blueprints, HttpStatus.ACCEPTED);
            }
            
        } catch (Exception e) {
            Logger.getLogger(BlueprintAPIController.class.getName()).log(Level.SEVERE, null, e);
            return new ResponseEntity<>("Error " + e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/blueprints/{author}/{bpname}", method = RequestMethod.GET)
    public ResponseEntity<?> handlerGetBlueprintsByAuthorAndBp(@PathVariable String author, @PathVariable String bpname){
        Blueprint blueprints = null;
        try {
            blueprints = bps.getBlueprint(author, bpname);
            if(blueprints == null){
                return new ResponseEntity<>("404 Not Found", HttpStatus.NOT_FOUND);
            }else{
                return new ResponseEntity<>(blueprints, HttpStatus.ACCEPTED);
            }
        } catch (Exception e) {
            Logger.getLogger(BlueprintAPIController.class.getName()).log(Level.SEVERE, null, e);
            return new ResponseEntity<>("404 Not Found", HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/blueprints/add", method = RequestMethod.POST)
    public ResponseEntity<?> handlerAddBlueprint(@RequestBody Blueprint bp){
        try {
            bps.addNewBlueprint(bp);
            return new ResponseEntity<>("Agregado correctamente", HttpStatus.ACCEPTED);
        } catch (Exception e) {
            Logger.getLogger(BlueprintAPIController.class.getName()).log(Level.SEVERE, null, e);
            return new ResponseEntity<>("Error " + e.getMessage(), HttpStatus.NOT_ACCEPTABLE);
        }
    }
    
    @PutMapping(value = "/blueprints/{author}/{bpname}")
    public ResponseEntity<?> handlerUpdateBlueprint(@PathVariable String author, @PathVariable String bpname, @RequestBody List<Point> Points){
        try {
            bps.updateBlueprint(author, bpname, Points);
            return new ResponseEntity<>("Actualizado correctamente",HttpStatus.ACCEPTED);
        } catch (Exception e) {
            Logger.getLogger(BlueprintAPIController.class.getName()).log(Level.SEVERE, null, e);
            return new ResponseEntity<>("404 Blueprint Not Found", HttpStatus.NOT_FOUND);
        }
    }
}
